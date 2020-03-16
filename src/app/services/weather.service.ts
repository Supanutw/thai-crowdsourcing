import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as L from 'leaflet';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  token: any = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE2NDcxMjg5ZDkyZjgyNDA5NmRmMzgwMjJiNzVjNzUxMzRiZDYyODE5MDMxNzk1MzM4YWNjY2RlZDc0MGI5OTE5N2ZiNWYwOWM5OTY1ZTM5In0.eyJhdWQiOiIyIiwianRpIjoiYTY0NzEyODlkOTJmODI0MDk2ZGYzODAyMmI3NWM3NTEzNGJkNjI4MTkwMzE3OTUzMzhhY2NjZGVkNzQwYjk5MTk3ZmI1ZjA5Yzk5NjVlMzkiLCJpYXQiOjE1ODM5MTc3NzIsIm5iZiI6MTU4MzkxNzc3MiwiZXhwIjoxNjE1NDUzNzcyLCJzdWIiOiI3NjIiLCJzY29wZXMiOltdfQ.aupdEFkXTW2j5GGlKZ8W84tZVOWh5XtC3jYEnBHnM0zwZa8CBbOyZ8AQvd-mMIkoYYc3RBaNde34EFKZLOfKihWuM6VncSqBnHhCIygDOAfMPR-gcvX3c4MTkSxDqoF2o6QaSxCKOxtHENW8zOanewRDWMGy7KEToXSMAQ-YiIogaS1tZ4M1YmAuvoooDCGWp0G4LkK8HKuEquDcEQDoha8ILGfbtgxhiEvWc6d3xAjqYpl2xds8D3GIGQl8D8RI6MQJHCLMyWeqRlxaG8SKAtRiK51ipm0hk9PODRtteYldAfPnW8YwE5_kJ3vLFu1igsqIZtsQWFHroYCQG5TKPaM2OEFboXLtt1wSlNLkj5g73DZAReIVr9Ibev2l1uZBPpp9iBrR_w5ggMKV3WV_gPr0zcRiML-DNtQXknRqkFy52cmKiSv95Pxo1rJGomgX53q6kYjAyoTlorYSsY_LHVl2gWiFOEhTml6I8LGp90gp1iJXRbnJHRvqEVzvxStGl1Jnm1eJCMKl5LdbQ_-fKzuZiEOiTvGS2Q7L2I0dmg_lGF31t-OqSksoBRTAvXw_MMH8FstizF643LiUm0pCbrRH6BYTncGoxCZRYibzx03GD35iBeLYPbVmuVLGqxDbhyQdWDrPrOohY0QEqWGy5FBywW1tZejdlcyhMhavhlQ';
  constructor(private http: HttpClient) { }

  generateRequestHeaders(): HttpHeaders {
    let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders = myHeaders.append('Content-type', 'application/json');
    myHeaders = myHeaders.append('authorization', 'Bearer ' + this.token);
    return myHeaders;
  }
  getWeather(region, date, time): Observable<any> {

    const headers = this.generateRequestHeaders();
    return this.http
      .get(`https://data.tmd.go.th/nwpapi/v1/forecast/location/hourly/region?region=${region}&fields=tc,rh&date=${date}&hour=${Number(time)}&duration=1`, { headers })
      .pipe(
        map(resp => {
          return resp;
        })
      );
  }
  // getWeather(region,date): Observable<any> {
  //   const headers = this.generateRequestHeaders();
  //   return this.http
  //     .get(`https://data.tmd.go.th/nwpapi/v1/forecast/location/daily/region?region=${region}&fields=tc_max,rh&date=${date}&duration=1`, { headers })
  //     .pipe(
  //       map(resp => {
  //         return resp;
  //       })
  //     );
  // }

  // makeCapitalMarkers(map_: L.map): void {
  //   let layer;
  //   let latlngs = [];
  //   this.getWeather('N', '').subscribe((res: any) => {
  //     for (const c of res.WeatherForecasts) {
  //       const lat = c.location.lat;
  //       const lon = c.location.lon;
  //       const popup = this.makeCapitalPopup(c);
  //       layer = L.marker([lat, lon]).addTo(map_);
  //       layer.bindTooltip(popup).openTooltip();
  //     }
  //   });
  // }

  // makeCapitalMarkersgeoJson(map_: L.map): void {
  //   this.getWeather('N', '').subscribe((res: any) => {
  //     const geoJson = this.ConvertJsonToGeo(res.WeatherForecasts);
  //     L.geoJson(geoJson).bindPopup(layer => {
  //       return `<div>พื้นที่: ${layer.feature.properties.name}</div>` +
  //         `<div>อุณหภูมิ: ${layer.feature.properties.p} °C</div>`;
  //     }).addTo(map_).openPopup();
  //   });
  // }

  // makeCapitalMarkersPopup(map_: L.map): void {
  //   let layer;
  //   this.getWeather('N', '').subscribe((res: any) => {
  //     // const geoJson = this.ConvertJsonToGeo(res.WeatherForecasts);
  //     // L.geoJson(geoJson).addTo(map_);
  //     for (const c of res.WeatherForecasts) {
  //       const lat = c.location.lat;
  //       const lon = c.location.lon;
  //       const popup = this.makeCapitalPopup(c);
  //       layer = L.popup()
  //         .setLatLng([lat, lon])
  //         .setContent(popup)
  //         .addTo(map_)
  //         .openOn(map_);
  //     }
  //   });
  // }

  // makeCapitalMarkersTooltip(map_: L.map): void {
  //   let layer;
  //   this.getWeather('N', '').subscribe((res: any) => {
  //     // const geoJson = this.ConvertJsonToGeo(res.WeatherForecasts);
  //     // L.geoJson(geoJson).addTo(map_);
  //     for (const c of res.WeatherForecasts) {
  //       const lat = c.location.lat;
  //       const lon = c.location.lon;
  //       layer = L.marker([lat, lon]).addTo(map_);
  //       const popup = this.makeCapitalPopup(c);
  //       layer.bindTooltip(popup).openTooltip();


  //     }
  //   });
  // }


  makeCapitalPopup(data: any): string {
    return `` +
      `<div>พื้นที่: ${data.location.name}</div>` +
      `<div>อุณหภูมิ: ${data.forecasts[0].data.tc} °C</div>`;
  }

  ConvertJsonToGeo(data: any) {
    const jsonFeatures: any = [];
    for (const element of data) {
      const lat = element.location.lat;
      const lon = element.location.lon;

      const feature = {
        type: 'Feature',
        properties: {
          name: element.location.name,
          p: element.forecasts[0].data.rh
        },
        geometry: {
          type: 'Point',
          coordinates: [
            lon, lat
          ]
        }
      };
      jsonFeatures.push(feature);
    }


    const geoJson = { type: 'FeatureCollection', features: jsonFeatures };
    return geoJson;
  }
}
