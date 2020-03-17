import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AirqualityService } from '../../services/airquality.service';
import { airqualitymodel } from '../../models/Air-Quality.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Airqualitymodel: airqualitymodel = new airqualitymodel();
  constructor(public airquality: AirqualityService) { }

  ngOnInit() {
    this.getGeolocalizedFeed();
  }


  getGeolocalizedFeed() {
    this.airquality.getGeolocalizedFeed().subscribe(res => {
      if (res.status === 200) {
        this.Airqualitymodel = res.body.data;
        this.Airqualitymodel.pollution = this.airquality.AirPollutionLevel(this.Airqualitymodel.aqi);
        console.log('xxx', this.Airqualitymodel);
        this.Airqualitymodel.iaqi.pm10 = this.Airqualitymodel.iaqi.pm10['v'];
        this.Airqualitymodel.iaqi.o3 = this.Airqualitymodel.iaqi.o3['v'];
       
      }

    });
  }

}
