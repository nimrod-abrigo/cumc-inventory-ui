import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { EventItemListComponent } from '../event-item-list/event-item-list.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() eventDetail;
  @Output() delete_event: EventEmitter<any> = new EventEmitter();
  @Output() edit_event: EventEmitter<any> = new EventEmitter();
  @Output() back:EventEmitter<any> = new EventEmitter();

  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  deleteEvent(){
    this.delete_event.emit(this.eventDetail.event_id);
  }

  editEvent(){
    this.edit_event.emit(this.eventDetail);
  }

  showEventItems(){
    this.bottomSheet.open(EventItemListComponent);
  }

  backEvent(){
    this.back.emit();
  }
}
