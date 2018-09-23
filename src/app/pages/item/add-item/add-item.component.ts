import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../../../service/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

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
      parts: new FormArray([])
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
    console.log(this.itemForm.value);
    this.itemService.addItem(this.itemForm.value).subscribe(
      result=>{
        console.log(result);
        this.dialogRef.close(result);
      }
    );
  }

}
