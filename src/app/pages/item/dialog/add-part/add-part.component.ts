import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../../../../service/item.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent implements OnInit {

  item_id:Number;
  partForm:FormGroup;
  partArray:FormArray;

  constructor(public dialogRef: MatDialogRef<AddPartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService:ItemService, private fb:FormBuilder) { }

  ngOnInit() {
    this.item_id = this.data.item_id;
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

    this.itemService.addPart(partValues,this.item_id).subscribe(
      result=>{
        console.log(result);
        this.dialogRef.close(result);
      }
    );
  }

}
