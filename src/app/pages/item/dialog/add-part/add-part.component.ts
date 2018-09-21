import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../../../../service/item.service';
import { Part } from '../../../../classes/part';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-part',
  templateUrl: './add-part.component.html',
  styleUrls: ['./add-part.component.css']
})
export class AddPartComponent implements OnInit {

  item_id:Number;
  partForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<AddPartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService:ItemService) { }

  ngOnInit() {
    this.item_id = this.data.item_id;

    this.partForm = new FormGroup({
      part_name: new FormControl('',[
        Validators.required
      ]),
      part_description: new FormControl('')
    });
  }

  submitDetails(){
    let partValues = [];
    partValues[0] = this.partForm.value;

    this.itemService.addPart(partValues,this.item_id).subscribe(
      result=>{
        this.dialogRef.close(result);
      }
    );
  }

}
