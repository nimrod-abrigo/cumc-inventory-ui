import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { AddEventComponent } from './add-event/add-event.component';
import { EventService } from '../../service/event.service';
import { Observable } from 'rxjs';
import { DeleteEventComponent } from './delete-event/delete-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EventClass } from '../../classes/event';

export interface eventData{

}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  events: Observable<any>;
  selectedEvent:EventClass;
  eventList:EventClass[];
  displayedColumns=["event_name","start_date","end_date","last_update_date"];
  dataSource:MatTableDataSource<EventClass>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
          this.getAllEvents();
        }
      }
    });
  }

  getAllEvents(){
    this.eventService.getAllEvents().subscribe(
      result=>{
        this.eventList = [];
        result.forEach(element=>{
          const data = element.payload.doc.data() as EventClass;
          data.event_id = element.payload.doc.id;
          this.eventList.push(data);
        });
        this.dataSource = new MatTableDataSource(this.eventList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  deleteEvent($event){
    let event_id = $event;
    const dialogRef = this.dialog.open(DeleteEventComponent, {
      width: '370px',
      data: {event_id : event_id}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.selectedEvent = null;
    // });
  }

  editEvent($event){
    let event = $event
    const dialogRef = this.dialog.open(EditEventComponent, {
      width: '370px',
      data: {event : event}
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if(result != null){
    //     if(result.affectedRows == 1){
    //       this.getAllEvents();
    //     }
    //   }
    // });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eventDetail(event){
    this.selectedEvent = event;
  }
}
