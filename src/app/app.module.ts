import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ViewerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
