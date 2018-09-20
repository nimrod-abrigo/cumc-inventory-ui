import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './pages/event/event.component';
import { ItemComponent } from './pages/item/item.component';
import { AddEventComponent } from './pages/event/add-event/add-event.component';
import { DeleteEventComponent } from './pages/event/delete-event/delete-event.component';
import { EditEventComponent } from './pages/event/edit-event/edit-event.component';
import { ViewEventDetailComponent } from './pages/event/view-event-detail/view-event-detail.component';
import { ItemInfoComponent } from './pages/item/item-info/item-info.component';

const routes : Routes = [
  { path:'event', component:EventComponent },
  { path:'item', component:ItemComponent },
  { path:'event/:id', component:ViewEventDetailComponent }
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
    EditEventComponent
  ],
})
export class AppRoutingModule { }
export const routingComponents = [EventComponent,ItemComponent, AddEventComponent, DeleteEventComponent,EditEventComponent, ViewEventDetailComponent, ItemInfoComponent]