import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddEventComponent } from './add-event/add-event.component';
import { EventService } from '../../service/event.service';
import { Observable } from 'rxjs';
import { EventClass } from '../../classes/event';
import { DeleteEventComponent } from './delete-event/delete-event.component';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events: Observable<any>;
  event:Array<EventClass>;

  constructor(public dialog:MatDialog, public snackBar: MatSnackBar, private eventService:EventService) { }

  ngOnInit() {
    this.getAllEvents();
  }

  addEvent(){
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '370px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        if(result.affectedRows == 1){
          this.openSnackBar("event inserted",null);
          this.getAllEvents();
        }
      }
    });
  }

  getAllEvents(){
    this.eventService.getAllEvents().subscribe(
      result=>{
        this.events = result;
      }
    );
  }

  deleteEvent(event_id){
    const dialogRef = this.dialog.open(DeleteEventComponent, {
      width: '370px',
      data: {event_id : event_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllEvents();
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
