import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { pollutionmodel } from '../models/Air-Quality.model';

@Injectable({
  providedIn: 'root'
})
export class AirqualityService {
  private token = '0105ed1c8b33f67ba1568c73ee7213babcecc15b';
  pollutionmodel: pollutionmodel = new pollutionmodel();
  constructor(private http: HttpService) { }

  getGeolocalizedFeed(): Observable<any> {
    return this.http.get(`https://api.waqi.info/feed/here/?token=${this.token}`).pipe(
      map(resp => {
        return resp;
      }),
    );
  }

  AirPollutionLevel(aqi) {
    if (aqi <= 50) {
      this.pollutionmodel.color = '#009966';
      this.pollutionmodel.pollutionlevelEN = 'Good';
      this.pollutionmodel.pollutionlevelTH = 'ดี';
    } else if (aqi <= 100) {
      this.pollutionmodel.color = '#ffde33';
      this.pollutionmodel.pollutionlevelEN = 'Moderate';
      this.pollutionmodel.pollutionlevelTH = 'ปานกลาง';
    } else if (aqi <= 150) {
      this.pollutionmodel.color = '#ff9933';
      this.pollutionmodel.pollutionlevelEN = 'Unhealthy for Sensitive Groups';
      this.pollutionmodel.pollutionlevelTH = 'เริ่มมีผลกระทบต่อสุขภาพ';
    } else if (aqi <= 200) {
      this.pollutionmodel.color = '#cc0033';
      this.pollutionmodel.pollutionlevelEN = 'Unhealthy';
      this.pollutionmodel.pollutionlevelTH = 'มีผลกระทบต่อสุขภาพ';
    } else if (aqi <= 300) {
      this.pollutionmodel.color = '#660099';
      this.pollutionmodel.pollutionlevelEN = 'Very Unhealthy';
      this.pollutionmodel.pollutionlevelTH = 'มีผลกระทบมาก';
    } else if (aqi > 300) {
      this.pollutionmodel.color = '#7e0023';
      this.pollutionmodel.pollutionlevelEN = 'Hazardous';
      this.pollutionmodel.pollutionlevelTH = 'อันตราย';
    } else {
      this.pollutionmodel.color = '';
      this.pollutionmodel.pollutionlevelEN = '';
      this.pollutionmodel.pollutionlevelTH = '';
    }
    this.pollutionmodel.aqi = aqi;
    return this.pollutionmodel;
  }


}
