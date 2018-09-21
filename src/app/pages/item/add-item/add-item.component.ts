import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../../../service/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  itemForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService:ItemService) { }

  ngOnInit() {
    this.itemForm = new FormGroup({
      item_name: new FormControl('',[
        Validators.required
      ]),
      item_description: new FormControl(''),
      number_total: new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])
    }); 
  }

  addPart(){
    (<FormArray>this.itemForm.get('parts')).push(
      new FormGroup({
        part_name: new FormControl('sfd'),
        part_description: new FormControl('')
      })
    )  
  }

  submitDetails(){
    console.log(this.itemForm.value);
  }

}
