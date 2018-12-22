import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../../../../service/item.service';
import { Item } from 'src/app/classes/item';
import { FormParseValidation } from 'src/app/classes/form-parse-validation';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  item:Item;
  itemForm: FormGroup;
  parts: FormArray;
  categories = [
    {id:1, name:'equipment'},
    {id:2, name:'accessories / peripherals'}, 
    {id:3, name:'prizes'}
  ];

  constructor(public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService:ItemService, private fb:FormBuilder) { }

  ngOnInit() {
    this.itemForm = new FormGroup({
      item_name: new FormControl('',[
        Validators.required
      ]),
      item_description: new FormControl(''),
      number_total: new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      category_id: new FormControl('',[
        Validators.required
      ]),
      parts: new FormArray([]),
    });
  }

  addPart(){
    this.parts = this.itemForm.get('parts') as FormArray;
    this.parts.push(
      this.fb.group({
        part_name: new FormControl('',[
          Validators.required
        ]),
        part_description: new FormControl('')
      })
    );
  }

  deletePart(i){
    const control = <FormArray>this.itemForm.controls['parts'];
    control.removeAt(i);
  }

  submitDetails(){
    this.item = this.itemForm.value;
    this.item.number_unavailable = 0;
    this.item.number_available = this.item.number_total;
    this.item.last_update_date = FormParseValidation.convertDateJson2(new Date());
    console.log(this.item.last_update_date);
    this.itemService.addItem(this.item).
    then(
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
