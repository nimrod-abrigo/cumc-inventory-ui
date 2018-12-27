import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventClass } from '../classes/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private afs: AngularFirestore) { }

  public addEvent(event){
    return this.afs.collection('events').add(event);
  }

  public getAllEvents(){
    return this.afs.collection('events',ref => ref.orderBy('last_update_date','desc')).snapshotChanges();
  }

  public deleteEvent(event_id){
    return this.afs.doc('events/' + event_id).delete();
  }

  public editEvent(event,event_id){
    return this.afs.doc('events/' + event_id).update(event);
  }

}
