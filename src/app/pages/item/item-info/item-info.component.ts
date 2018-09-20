import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../../service/item.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DeletePartComponent } from '../dialog/delete-part/delete-part.component';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  id;
  @Input() itemInfo;
  @Output() deletePartEvent = new EventEmitter();
  displayedColumns=["part_name","part_description","action"];

  constructor(public dialog:MatDialog) { }

  ngOnInit() {
  }

  addPart(){

  }

  deletePart(part_id){
    const dialogRef = this.dialog.open(DeletePartComponent, {
      width: '370px',
      data: {part_id : part_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deletePartEvent.emit(result);
    });
  }

}
