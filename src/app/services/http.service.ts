import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// import { StorageService } from './storage.service';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
// import { NzNotificationService } from 'ng-zorro-antd/notification';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient
    // , private storage: StorageService, 
    // private notification: NzNotificationService
  ) { }

  generateRequestHeaders(): HttpHeaders {
    let myHeaders: HttpHeaders = new HttpHeaders();
    // myHeaders = myHeaders.append('Content-type', 'application/json');
    // myHeaders = myHeaders.append('Access-Control-Allow-Origin', '*');
    // myHeaders = myHeaders.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    // myHeaders = myHeaders.append('Access-Control-Allow-Header', 'Content-Type');
    // myHeaders = myHeaders.append('')
    // myHeaders = myHeaders.append('Authorization', 'Bearer ' + this.storage.Token);
    // myHeaders = myHeaders.append('Content-type', 'application/json');
    // myHeaders = myHeaders.append('observe', 'response');
    return myHeaders;
  }

  async _get<T>(url: string): Promise<T> {
    const headers = this.generateRequestHeaders();
    const res = await this.http
      .get(url, { headers })
      .toPromise<any>()
      .catch(
        catchError(error => {
          return this.handleError(error);
        }),
      );
    return res;
  }

  get(url: string): Observable<HttpResponse<any>> {
    return this.doGet(url);
  }

  private doGet(url: string): Observable<HttpResponse<object>> {
    const headers = this.generateRequestHeaders();
    return this.http.get(url, { headers, observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        // console.log(res);
        return res;
      }),
      catchError(error => this.handleError(error)),
    );
  }

  post(url: string, model: any): Observable<HttpResponse<any>> {
    return this.doPost(url, model);
  }
  private doPost(url: string, model: any): Observable<HttpResponse<Object>> {
    const headers = this.generateRequestHeaders();
    const body = JSON.stringify(model);
    return this.http.post(url, body, { headers, observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {
        // console.log(res);
        return res;
      }),
      catchError(error => this.handleError(error)),
    );
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      // this.notification.error('Client side error occurred', error.message);
      console.error('Client side network error occurred:', error.message);
    } else {
      // this.notification.error(
      //   'Backend error occurred',
      //   `status: ${error.status}, ` + `statusText: ${error.statusText}, ` + `message: ${error.message}`,
      // );
      console.error(
        'Backend - ' + `status: ${error.status}, ` + `statusText: ${error.statusText}, ` + `message: ${error.message}`,
      );
    }
    // return an observable with a user-facing error message
    return throwError(error || 'server error');
  }
}
