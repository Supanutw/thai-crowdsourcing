import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DustService {
  private token = '0105ed1c8b33f67ba1568c73ee7213babcecc15b';

  constructor(private http: HttpService,
    private httpclient: HttpClient
  ) { }
  // './assets/data/th-map.json'
  getThaimap(keyword): Observable<any> {
    return this.http.get(`https://api.waqi.info/search/?keyword=${keyword}&token=${this.token}`).pipe(
      map(resp => {
        return resp;
      }),
    );
    // return this.httpclient.get<any>('http://air4thai.pcd.go.th/services/getNewAQI_XML.php');
  }


  // getTest(): Observable<any> {
  //   // return this.httpclient.get<any>('http://air4thai.pcd.go.th/services/getNewAQI_JSON.php');
  // }



  ConvertJsonToGeo(data: any) {
    const jsonFeatures: any = [];
    data.forEach(element => {
      const lat = element.station.geo[0];
      const lon = element.station.geo[1];

      const feature = {
        type: 'Feature',
        properties: {
          name: element.station.name,
          p: element.aqi
        },
        geometry: {
          type: 'point',
          coordinates: [lat,lon]
        }
      };
      jsonFeatures.push(feature);
    });
    const geoJson = { type: 'FeatureCollection', features: jsonFeatures };
    return geoJson;
  }

}
