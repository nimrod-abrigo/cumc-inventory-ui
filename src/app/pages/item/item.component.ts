import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { Observable, Subscription } from 'rxjs';
import { Item } from '../../classes/item';
import { Part } from '../../classes/part';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  equipments:Observable<any>;
  item:Item;
  itemSelected:Observable<any>;
  itemSub:Subscription;

  constructor(private itemService: ItemService) { }

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
    console.log("Delete "+item_id);
  }
}
