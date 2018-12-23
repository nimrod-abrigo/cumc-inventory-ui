import { Component, OnInit, Inject } from '@angular/core';
import { ItemService } from '../../../../service/item.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-delete-part',
  templateUrl: './delete-part.component.html',
  styleUrls: ['./delete-part.component.css']
})
export class DeletePartComponent implements OnInit {

  item:Item;
  index:number;

  constructor(public dialogRef: MatDialogRef<DeletePartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService: ItemService) { }

  ngOnInit() {
    this.item = this.data.item;
    this.index = this.data.index;
  }

  delete(){
    this.item.parts.splice(this.index);
    let id = this.item.item_id;
    delete this.item.item_id;

    this.itemService.editItem(this.item, id).
    then(
      result=>{
        this.item.item_id = id;
        this.dialogRef.close(this.item);
      }
    ).catch(
      error=>{
        this.dialogRef.close("error");
      }
    )
  }

}
