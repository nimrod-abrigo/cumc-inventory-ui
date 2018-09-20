import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { Observable, Subscription } from 'rxjs';
import { Item } from '../../classes/item';
import { MatDialog } from '@angular/material';
import { DeleteItemComponent } from './dialog/delete-item/delete-item.component';
import { EditItemComponent } from './dialog/edit-item/edit-item.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  equipments:Observable<any>;
  item:Item;
  itemSub:Subscription;

  constructor(private itemService: ItemService,public dialog:MatDialog) { }

  ngOnInit() {
    this.getAllEquipments();
  }

  getAllEquipments(){
    this.itemSub = this.itemService.getAllItemsByCategory(1).subscribe(
      result=>{
        this.equipments = result; 
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
      this.getAllEquipments();
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
          this.getAllEquipments();
          this.getItemInfo(item_info.item_id);
        }
      }
    });
  }

  deletePart(result){
    if(result){
      if(result.affectedRows==1){
        this.getAllEquipments();
        this.getItemInfo(this.item.item_id);
      }
    }
  }
}