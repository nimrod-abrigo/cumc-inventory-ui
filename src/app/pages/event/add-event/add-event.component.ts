import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventService } from '../../../service/event.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormParseValidation } from '../../../classes/form-parse-validation';
import { EventClass } from 'src/app/classes/event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  event: EventClass;
  result: Observable<any>;
  eventForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private eventService: EventService) { }

  ngOnInit() {
    this.eventForm = new FormGroup({
      event_name: new FormControl('',[
        Validators.required
      ]),
      event_remarks: new FormControl(''),
      start_date: new FormControl('',[
        Validators.required
      ]),
      end_date: new FormControl('',[
        Validators.required
      ])
    },FormParseValidation.validateDate);
  }

  submitDetails(){
    let event = this.eventForm.value;

    let tmp_date = FormParseValidation.convertDateJson2(event.start_date);
    event.start_date = tmp_date;
    tmp_date = FormParseValidation.convertDateJson2(event.end_date);
    event.end_date = tmp_date;
    event.last_update_date = FormParseValidation.convertDateJson2(new Date());
    this.eventService.addEvent(event)
    .then(
      result=>{
        this.dialogRef.close("success");
      }
    ).catch(
      error=>{
        this.dialogRef.close("error");
      }
    );
  }

  
}
