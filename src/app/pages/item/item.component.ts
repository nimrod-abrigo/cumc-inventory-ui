import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { Observable, Subscription } from 'rxjs';
import { Item } from '../../classes/item';
import { MatDialog, Sort, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DeleteItemComponent } from './dialog/delete-item/delete-item.component';
import { EditItemComponent } from './dialog/edit-item/edit-item.component';
import { AddItemComponent } from './dialog/add-item/add-item.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { AddPartComponent } from './dialog/add-part/add-part.component';
import { DeletePartComponent } from './dialog/delete-part/delete-part.component';

export interface userData{

}
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent implements OnInit {

  items:Observable<any>;
  itemList:Item[];
  item:Item;
  itemSub:Subscription;
  displayedColumns=["item_name","category","number_total","number_available","number_unavailable","last_update_date"];
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
        this.itemList=[];
        result.forEach(element => {
          const data = element.payload.doc.data() as Item;
          data.item_id = element.payload.doc.id;
          this.itemList.push(data as Item);
        });
        this.dataSource = new MatTableDataSource(this.itemList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  deleteItem(item){
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '370px',
      data: {item_id : item.item_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == ""){
        this.onRowClicked(item);
      }
    });
  }

  editItem(item_info){
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: '600px',
      data: {item_info : item_info}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onRowClicked(item_info);
    });
  }

  addItem(){
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "error"){
        console.log('bigte');
      }else{

      }
    });
  }

  addPart(item){
    const dialogRef = this.dialog.open(AddPartComponent, {
      width: '600px',
      data: {item : item}
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.getItemInfo(item);
      this.onRowClicked(item);
    });
  }

  deletePart(item,index){
    const dialogRef = this.dialog.open(DeletePartComponent, {
        width: '370px',
        data:{item:item, index:index}
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if(result != "error"){
        this.onRowClicked(result);
      }
    });
  }

  onRowClicked(row){
    const dialogRef = this.dialog.open(ItemInfoComponent,{
      width:'700px',
      data: {item_info : row}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result == "edit"){
        this.editItem(row);
      }else if(result == "delete"){
        this.deleteItem(row);
      }else if(result === "add part"){
        this.addPart(row);
      }else if(result.event == "delete part"){
        this.deletePart(row,result.index);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}