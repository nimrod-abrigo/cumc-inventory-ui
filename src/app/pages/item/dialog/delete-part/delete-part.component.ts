import { Component, OnInit, Inject } from '@angular/core';
import { ItemService } from '../../../../service/item.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-part',
  templateUrl: './delete-part.component.html',
  styleUrls: ['./delete-part.component.css']
})
export class DeletePartComponent implements OnInit {

  part_id:Number;

  constructor(public dialogRef: MatDialogRef<DeletePartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private itemService: ItemService) { }

  ngOnInit() {
    this.part_id = this.data.part_id;
  }

  delete(){
    this.itemService.deletePart(this.part_id).subscribe(
      result=>{
        this.dialogRef.close(result);
      }
    );
  }

}
