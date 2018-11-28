import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeletePartComponent } from '../dialog/delete-part/delete-part.component';
import { AddPartComponent } from '../dialog/add-part/add-part.component';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  id;
  @Input() itemInfo;
  @Output() partEvent = new EventEmitter();
  displayedColumns=["part_name","part_description","action"];
  categories = [
    {id:1, name:'equipment'},
    {id:2, name:'accessories / peripherals'}, 
    {id:3, name:'prizes'}
  ];
  category_name;

  constructor(public dialog:MatDialog) { 
  }

  ngOnInit() {
    if(this.itemInfo != null){
      this.category_name = this.categories.find(x=>x.id == this.itemInfo.category_id).name;
      console.log(this.category_name);
    } 
  }

  addPart(item_id){
    const dialogRef = this.dialog.open(AddPartComponent, {
      width: '500px',
      data: {item_id : item_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.partEvent.emit(result);
    });
  }

  deletePart(part_id){
    const dialogRef = this.dialog.open(DeletePartComponent, {
      width: '370px',
      data: {part_id : part_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.partEvent.emit(result);
    });
  }

  close(){
    this.itemInfo = null;
  }

}
