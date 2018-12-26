import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatOptionModule, MatCardModule, MatNativeDateModule, MatDatepickerModule, MatIconModule, MatTooltipModule, MatListModule, MatDialogModule, MatInputModule, MatSnackBarModule, MatExpansionModule, MatTableModule, MatOption, MatSelectModule, MatSidenavModule, MatMenuModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './/app-routing.module';
import { environment } from 'src/environments/environment';
import { EventDetailComponent } from './pages/event/event-detail/event-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatListModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
