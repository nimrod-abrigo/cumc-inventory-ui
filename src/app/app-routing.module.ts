import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './pages/event/event.component';
import { ItemComponent } from './pages/item/item.component';
import { AddEventComponent } from './pages/event/add-event/add-event.component';

const routes : Routes = [
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
    AddEventComponent
  ],
})
export class AppRoutingModule { }
export const routingComponents = [EventComponent,ItemComponent, AddEventComponent]