import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventService } from '../../../service/event.service';
import { EventClass } from '../../../classes/event';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormParseValidation } from '../../../classes/form-parse-validation';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  event:EventClass;
  eventForm: FormGroup;
  result: Observable<any>

  constructor(public dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private eventService: EventService) { }

  ngOnInit() {
    this.event = this.data.event;

    this.eventForm = new FormGroup({
      event_name: new FormControl(this.event.event_name,[
        Validators.required
      ]),
      event_remarks: new FormControl(this.event.event_remarks),
      start_date: new FormControl(this.event.start_date,[
        Validators.required
      ]),
      end_date: new FormControl(this.event.end_date,[
        Validators.required
      ])
    },FormParseValidation.validateDate);
  }

  submitDetails(){
    let eventValues = this.eventForm.value;

    this.event.event_name = eventValues.event_name;
    this.event.event_remarks = eventValues.event_remarks;
    
    let tmp_date = FormParseValidation.convertDateJson(eventValues.start_date);
    this.event.start_date = tmp_date;
    tmp_date = FormParseValidation.convertDateJson(eventValues.end_date);
    this.event.end_date = tmp_date;

    console.log(eventValues);

    this.eventService.editEvent(eventValues).subscribe(
      result=>{
        this.result = result;
        this.dialogRef.close(this.result);
      }
    );
  }

}
