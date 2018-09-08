import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddEventComponent } from './add-event/add-event.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor(public dialog:MatDialog) { }

  ngOnInit() {
  }

  addEvent(){
    const dialogRef = this.dialog.open(AddEventComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
