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

  constructor(public dialog:MatDialog) { }

  ngOnInit() {
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

}
