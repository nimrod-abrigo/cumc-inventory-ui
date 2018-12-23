import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../../../../service/item.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent implements OnInit {

  item:Item;
  partForm:FormGroup;
  partArray:FormArray;

  constructor(public dialogRef: MatDialogRef<AddPartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService:ItemService, private fb:FormBuilder) { }

  ngOnInit() {
    this.item = this.data.item;
    this.partForm = new FormGroup({
      parts: new FormArray([])
    });
    this.addPart();
  }

  addPart(){
    this.partArray = this.partForm.get('parts') as FormArray;
    this.partArray.push(
      this.fb.group({
        part_name: new FormControl('',[
          Validators.required
        ]),
        part_description: new FormControl('')
      })
    );
  }

  deletePart(i){
    const control = <FormArray>this.partForm.controls['parts'];
    control.removeAt(i);
  }

  submitDetails(){
    let partValues = this.partForm.get('parts').value;
    let id = this.item.item_id;
    let tmp_parts = [];

    this.item.parts.forEach(element=>{
      tmp_parts.push(element);
    });
    partValues.forEach(element => {
      tmp_parts.push(element);
    });

    this.item.parts = tmp_parts;
    delete this.item.item_id;

    this.itemService.editItem(this.item, id).
    then(
      result=>{
        this.dialogRef.close("info");
      }
    ).catch(
      error=>{
        this.dialogRef.close("error");
      }
    );
  }

}
