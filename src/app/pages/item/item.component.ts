import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { Observable, Subscription } from 'rxjs';
import { Item } from '../../classes/item';
import { MatDialog, Sort, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DeleteItemComponent } from './dialog/delete-item/delete-item.component';
import { EditItemComponent } from './dialog/edit-item/edit-item.component';
import { AddItemComponent } from './dialog/add-item/add-item.component';

export interface userData{

}
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {

  items:Observable<any>;
  item:Item;
  itemSub:Subscription;
  displayedColumns=["item_id","item_name","category","number_total","number_available","number_unavailable"];
  dataSource:MatTableDataSource<userData>;

  constructor(private itemService: ItemService,public dialog:MatDialog) {
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngOnInit() {
    this.getAllItems();
  }

  getAllItems(){
    this.itemService.getAllItems().subscribe(
      result=>{
        let data:any = result;
        this.items = result;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
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

  onRowClicked(row){
    console.log(row);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}