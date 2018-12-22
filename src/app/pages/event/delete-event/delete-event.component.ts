import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventService } from '../../../service/event.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {
  event_id:Number;

  constructor(public dialogRef: MatDialogRef<DeleteEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private eventService: EventService) { }

  ngOnInit() {
    this.event_id = this.data.event_id;
  }

  delete(){
    this.eventService.deleteEvent(this.event_id).
    then(
      result=>{
        this.dialogRef.close("deleted");
      }
    ).catch(
      error=>{
        this.dialogRef.close("error");
      }
    );
  }
}
