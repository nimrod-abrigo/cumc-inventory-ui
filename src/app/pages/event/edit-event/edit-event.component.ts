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

  eventClass:EventClass;
  eventForm: FormGroup;
  result: Observable<any>

  constructor(public dialogRef: MatDialogRef<EditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private eventService: EventService) { }

  ngOnInit() {
    this.eventClass = this.data.event;

    this.eventForm = new FormGroup({
      event_name: new FormControl(this.eventClass.event_name,[
        Validators.required
      ]),
      event_remarks: new FormControl(this.eventClass.event_remarks),
      start_date: new FormControl(this.eventClass.start_date,[
        Validators.required
      ]),
      end_date: new FormControl(this.eventClass.end_date,[
        Validators.required
      ])
    },FormParseValidation.validateDate);
  }

  submitDetails(){
    let eventValues = this.eventForm.value;

    this.eventClass.event_name = eventValues.event_name;
    this.eventClass.event_remarks = eventValues.event_remarks;
    
    let tmp_date = FormParseValidation.convertDateJson(eventValues.start_date);
    this.eventClass.start_date = tmp_date;
    tmp_date = FormParseValidation.convertDateJson(eventValues.end_date);
    this.eventClass.end_date = tmp_date;

    console.log(this.eventClass);

    this.eventService.editEvent(this.eventClass).subscribe(
      result=>{
        this.result = result;
        this.dialogRef.close(this.result);
      }
    );
  }

}
