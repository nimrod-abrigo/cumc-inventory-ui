import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly API_URL = "http://localhost:4000/event";

  constructor(private _http: HttpClient) { }

  public addEvent(event):Observable<any>{
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    
    let body = new HttpParams();
    body = body.set('event_name', event.event_name);
    body = body.set('event_remarks', event.event_remarks);
    body = body.set('start_date',event.start_date);
    body = body.set('end_date', event.end_date);

    return this._http.post(this.API_URL,body,{headers: myheader});
  }

}
