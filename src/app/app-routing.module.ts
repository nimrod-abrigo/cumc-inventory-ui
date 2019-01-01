import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './pages/event/event.component';
import { ItemComponent } from './pages/item/item.component';
import { AddEventComponent } from './pages/event/add-event/add-event.component';
import { DeleteEventComponent } from './pages/event/delete-event/delete-event.component';
import { EditEventComponent } from './pages/event/edit-event/edit-event.component';
import { ItemInfoComponent } from './pages/item/item-info/item-info.component';
import { DeleteItemComponent } from './pages/item/dialog/delete-item/delete-item.component';
import { EditItemComponent } from './pages/item/dialog/edit-item/edit-item.component';
import { DeletePartComponent } from './pages/item/dialog/delete-part/delete-part.component';
import { AddPartComponent } from './pages/item/dialog/add-part/add-part.component';
import { AddItemComponent } from './pages/item/dialog/add-item/add-item.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EventItemListComponent } from './pages/event/event-item-list/event-item-list.component';

const routes : Routes = [
  { path:'', component: DashboardComponent},
  { path:'event', component:EventComponent },
  { path:'item', component:ItemComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  entryComponents: [
    AddEventComponent,
    DeleteEventComponent,
    EditEventComponent,
    DeleteItemComponent,
    EditItemComponent,
    DeletePartComponent,
    AddPartComponent,
    AddItemComponent,
    ItemInfoComponent,
    EventItemListComponent,
  ],
})
export class AppRoutingModule { }
export const routingComponents = [EventComponent,ItemComponent, AddEventComponent, DeleteEventComponent,EditEventComponent, ItemInfoComponent, DeleteItemComponent, EditItemComponent, DeletePartComponent,AddPartComponent,AddItemComponent,DashboardComponent]