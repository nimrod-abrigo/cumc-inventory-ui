import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventService } from '../../../service/event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  result: Observable<any>;

  constructor(public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private eventService: EventService) { }

  ngOnInit() {
  }

  submitDetails(eventForm){
    let tmp_date = this.convertDateJson(eventForm.value.start_date);
    eventForm.value.start_date = tmp_date;
    tmp_date = this.convertDateJson(eventForm.value.end_date);
    eventForm.value.end_date = tmp_date;

    console.log(eventForm.value);
    this.eventService.addEvent(eventForm.value).subscribe(
      result=>{
        this.result = result;
        console.log(result);
        this.dialogRef.close(this.result);
      }
    );
  }

  convertDateJson(date){
    var tmp_date = new Date(date);
    tmp_date.setDate(tmp_date.getDate() + 1);
    return tmp_date.toJSON();
  }
}
