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
    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    
    let body = { 
      event_name: event.event_name,
      event_remarks : event.event_remarks,
      start_date : event.start_date,
      end_date : event.end_date
    }

    return this._http.post(this.API_URL,body,{headers: myheader});
  }

  public getAllEvents():Observable<any>{
    return this._http.get(this.API_URL);
  }

  public deleteEvent(event_id):Observable<any>{
    return this._http.delete(this.API_URL+"/"+event_id);
  }

  public editEvent(event):Observable<any>{
    const myheader = new HttpHeaders().set('Content-Type', 'application/json')
    
    let body = { 
      event_name: event.event_name,
      event_remarks : event.event_remarks,
      start_date : event.start_date,
      end_date : event.end_date
    }
    return this._http.put(this.API_URL+"/"+event.event_id,body,{headers: myheader});
  }

}
