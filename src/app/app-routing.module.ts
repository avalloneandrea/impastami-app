import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'viewer', component: ViewerComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {}
