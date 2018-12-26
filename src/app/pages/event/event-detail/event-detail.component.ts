import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() eventDetail;
  @Output() delete_event: EventEmitter<any> = new EventEmitter();
  @Output() edit_event: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteEvent(){
    this.delete_event.emit(this.eventDetail.event_id);
  }

  editEvent(){
    this.edit_event.emit(this.eventDetail);
  }
}
