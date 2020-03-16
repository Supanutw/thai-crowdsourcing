import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { DustService } from '../../services/dust.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-dust',
  templateUrl: './dust.component.html',
  styleUrls: ['./dust.component.css']
})
export class DustComponent implements AfterViewInit, OnInit {
  // private map;
  private map;
  geojson_data: any;
  keywordmodel: any = 'กรุงเทพ';

  constructor(private dustService: DustService) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit() {
    // this.getMap();
    // this.dustService.getTest().subscribe(res => console.log(res));
  }

  getMap() {
    // this.dustService.getThaimap().subscribe((res) => {
    //   this.geojson_data = this.dustService.ConvertJsonToGeo(res.body.data);
    //   console.log('data',this.geojson_data)
    //   // this.geojson_data = res.body.data;
    // })
  }

  private initMap(): void {
    this.map = L.map('map');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}',
      {
        id: 'mapbox/light-v9',
        foo: 'bar',
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      },

    ).addTo(this.map);
    this.map.locate({ setView: true, maxZoom: 5 });

    const iconRetinaUrl = '../../../assets/images/marker-icon-2x.png';
    const iconUrl = '../../../assets/images/marker-icon.png';
    const shadowUrl = '../../../assets/images/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  onSearch(): void {
    if (this.keywordmodel !== '') {
      this.dustService.getThaimap(this.keywordmodel).subscribe((res) => {
        if (res.status === 200) {
          let layer;
          for (const c of res.body.data) {
            const lat = c.station.geo[0];
            const lon = c.station.geo[1];
            const color_ = this.AirPollutionLevel(c.aqi);
            const popup = `<div>พื้นที่: ${c.station.name}</div>` +
              `<div>AQI: ${c.aqi} </div>`;
            layer = L.marker([lat, lon]).addTo(this.map);
            layer = L.circleMarker([lat, lon], {
              radius: 20,
              color: color_,
              fillColor: color_,
              fillOpacity: 1,
            }).addTo(this.map);
            layer.bindTooltip(popup);

            this.map.panTo(new L.LatLng(lat, lon));
            this.map.setView([lat, lon], 10);
          }
        }
      });
    }
  }

  AirPollutionLevel(aqi) {
    if (aqi <= 50) {
      return '#009966';
    } else if (aqi <= 100) {
      return '#ffde33';
    } else if (aqi <= 150) {
      return '#ff9933';
    } else if (aqi <= 200) {
      return '#cc0033';
    } else if (aqi <= 300) {
      return '#660099';
    } else if (aqi > 300) {
      return '#7e0023';
    }

  }

}
