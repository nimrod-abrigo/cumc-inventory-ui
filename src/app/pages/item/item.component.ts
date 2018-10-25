import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { Observable, Subscription } from 'rxjs';
import { Item } from '../../classes/item';
import { MatDialog } from '@angular/material';
import { DeleteItemComponent } from './dialog/delete-item/delete-item.component';
import { EditItemComponent } from './dialog/edit-item/edit-item.component';
import { AddItemComponent } from './dialog/add-item/add-item.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items:Observable<any>;
  item:Item;
  itemSub:Subscription;

  constructor(private itemService: ItemService,public dialog:MatDialog) { }

  ngOnInit() {
    this.getAllItems();
  }

  getAllItems(){
    this.itemSub = this.itemService.getAllItems().subscribe(
      result=>{
        this.items = result;
      }
    );
  }

  getItemInfo(item_id){
    this.itemService.getItemParts(item_id).subscribe(
      result=>{
        this.item = result[0];
      }
    );
  }

  deleteItem(item_id){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '370px',
      data: {item_id : item_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllItems();
      this.item = null;
    });
  }

  editItem(item_info){
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: '370px',
      data: {item_info : item_info}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        if(result.affectedRows==1){
          this.getAllItems();
          this.getItemInfo(item_info.item_id);
        }
      }
    });
  }

  partEvent(result){
    if(result){
      if(result.affectedRows>=1){
        this.getAllItems();
        this.getItemInfo(this.item.item_id);
      }
    }
  }

  addItem(){
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        if(result.item.affectedRows==1){
          this.getAllItems();
          this.item = null;
        }
      }
    });
  }
}