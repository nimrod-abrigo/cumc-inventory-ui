import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemService } from '../../../../service/item.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  item_id:Number;

  constructor(public dialogRef: MatDialogRef<DeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService: ItemService) { }

  ngOnInit() {
    this.item_id = this.data.item_id;
  }

  delete(){
    this.itemService.deleteItem(this.item_id).subscribe(
      result=>{
        this.dialogRef.close(result);
      }
    );
  }

}
