import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeletePartComponent } from '../dialog/delete-part/delete-part.component';
import { AddPartComponent } from '../dialog/add-part/add-part.component';
import { Item } from 'src/app/classes/item';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {
  itemInfo:Item;
  displayedColumns=["part_name","part_description","action"];
  categories = [
    {id:1, name:'equipment'},
    {id:2, name:'accessories / peripherals'}, 
    {id:3, name:'prizes'}
  ];

  constructor(public dialog:MatDialog,
    public dialogRef: MatDialogRef<ItemInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
  }

  ngOnInit() {
    this.itemInfo = this.data.item_info;
  }

  editItem(){
    this.dialogRef.close("edit");
  }

  deleteItem(){
    this.dialogRef.close("delete");
  }

  // addPart(item_id){
  //   const dialogRef = this.dialog.open(AddPartComponent, {
  //     width: '500px',
  //     data: {item_id : item_id}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.partEvent.emit(result);
  //   });
  // }

  // deletePart(part_id){
  //   const dialogRef = this.dialog.open(DeletePartComponent, {
  //     width: '370px',
  //     data: {part_id : part_id}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.partEvent.emit(result);
  //   });
  // }

  // close(){
  //   this.itemInfo = null;
  // }

}
