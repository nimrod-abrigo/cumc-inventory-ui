import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../service/event.service';
import { EventClass } from '../../../classes/event';

@Component({
  selector: 'app-view-event-detail',
  templateUrl: './view-event-detail.component.html',
  styleUrls: ['./view-event-detail.component.css']
})
export class ViewEventDetailComponent implements OnInit {

  id;
  eventDetail:EventClass;

  constructor(private _Activatedroute:ActivatedRoute,
    private eventService:EventService) { }

  ngOnInit() {
    this.id = this._Activatedroute.snapshot.params['id'];
    this.getEventDetail(this.id);
  }

  getEventDetail(event_id){
    this.eventService.getEventDetail(event_id).subscribe(
      result=>{
        this.eventDetail = result[0];
      }
    );
  }

}
