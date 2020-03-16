import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import * as L from 'leaflet';
import * as $ from 'jquery';
// import { icon, Marker } from 'leaflet';
import { WeatherService } from './../../services/weather.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements AfterViewInit {
  // @ViewChild('map', { static: false }) public map: ElementRef;
  private map;
  weathermodel: any;
  weatherdata: any = [];
  date = new Date();
  public province: any = '';
  layer: any;
  constructor(private weatherService: WeatherService) { }

  ngAfterViewInit(): void {
    this.initMap();
    // const datePipe = new DatePipe('en');
    // const time = datePipe.transform(this.date, 'HH');
    // this.weatherService.getWeather('', datePipe.transform(this.date, 'yyyy-MM-dd'), time).subscribe((res: any) => {
    //   this.weathermodel = res.WeatherForecasts;
    //   for (const c of res.WeatherForecasts) {
    //     const lat = c.location.lat;
    //     const lon = c.location.lon;
    //     const popup = this.weatherService.makeCapitalPopup(c);
    //     const layer = L.marker([lat, lon]).addTo(this.map);
    //     layer.bindTooltip(popup).openTooltip();
    //   }
    // });
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
    this.map.locate({ setView: true, maxZoom: 8 });

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

    // this.map.on('click', function () {
    //   this.map.removeLayer(this.layer);
    // });


  }

  loadWeather() {
    let lat = 0;
    let long = 0;

    switch (this.province) {
      case 'C': lat = 13.753958; long = 100.501746; break;
      case 'N': lat = 18.145782; long = 98.987038; break;
      case 'NE': lat = 16.438271; long = 102.838807; break;
      case 'E': lat = 12.23194; long = 102.512659; break;
      case 'S': lat = 7.207486; long = 100.596251; break;
      case 'W': lat = 13.111882; long = 99.94402; break;
    }

    if (this.layer != null) {
      $(".marker-delete-button:visible").click(function () {
        this.map.removeLayer(this.layer);
      });
    }

    this.map.panTo(new L.LatLng(lat, long));


    const datePipe = new DatePipe('en');
    const time = datePipe.transform(this.date, 'HH');
    this.weatherService.getWeather(this.province, datePipe.transform(this.date, 'yyyy-MM-dd'), time).subscribe((res: any) => {
      this.weathermodel = res.WeatherForecasts;
      for (const c of res.WeatherForecasts) {
        const popup = this.weatherService.makeCapitalPopup(c);
        this.layer = L.marker([c.location.lat, c.location.lon]).addTo(this.map);
        this.layer.bindTooltip(popup).openTooltip();

      }
    });
  }


}
