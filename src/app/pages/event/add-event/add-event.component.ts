import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventService } from '../../../service/event.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormParseValidation } from '../../../classes/form-parse-validation';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
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
    let eventValues = this.eventForm.value;

    let tmp_date = FormParseValidation.convertDateJson(eventValues.start_date);
    eventValues.start_date = tmp_date;
    tmp_date = FormParseValidation.convertDateJson(eventValues.end_date);
    eventValues.end_date = tmp_date;

    this.eventService.addEvent(eventValues).subscribe(
      result=>{
        this.result = result;
        this.dialogRef.close(this.result);
      }
    );
  }

  
}
