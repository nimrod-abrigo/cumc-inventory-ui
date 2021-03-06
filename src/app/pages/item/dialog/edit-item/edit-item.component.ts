import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Item } from '../../../../classes/item';
import { ItemService } from '../../../../service/item.service';
import { FormParseValidation } from '../../../../classes/form-parse-validation';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  itemForm: FormGroup;
  item:Item;
  itemEnter:Item;

  categories = [
    {id:1, name:'equipment'},
    {id:2, name:'accessories / peripherals'}, 
    {id:3, name:'prizes'}
  ];

  constructor(public dialogRef: MatDialogRef<EditItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService:ItemService) { 
    }

  ngOnInit() {
    this.item = this.data.item_info;

    this.itemForm = new FormGroup({
      item_name: new FormControl(this.item.item_name,[
        Validators.required
      ]),
      item_description: new FormControl(this.item.item_description),
      number_total: new FormControl(this.item.number_total,[
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      category_id: new FormControl(this.item.category_id.toString(),[
        Validators.required
      ])
    });
  }

  submitDetails(){
    this.item.item_name = this.itemForm.value.item_name;
    this.item.item_description = this.itemForm.value.item_description;
    this.item.number_total= this.itemForm.value.number_total;

    this.itemService.editItem(this.item).subscribe(
      result=>{
        this.dialogRef.close(result);
      }
    )
  }

}
