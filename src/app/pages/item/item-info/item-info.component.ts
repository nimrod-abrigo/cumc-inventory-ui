import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../../service/item.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  id;
  @Input() itemInfo;

  constructor() { }

  ngOnInit() {
  }

}
