import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  equipments:Observable<any>;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getAllEquipments();
  }

  getAllEquipments(){
    this.itemService.getAllItemsByCategory(1).subscribe(
      result=>{
        this.equipments = result; 
      }
    );
  }

  showInfo(item_id){
    this.itemService.getItemParts(item_id).subscribe(
      result=>{
        this.equipments = result; 
      }
    );
    console.log("View "+item_id);
  }

  deleteItem(item_id){

    console.log("Delete "+item_id);
  }
}
