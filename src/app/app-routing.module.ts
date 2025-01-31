import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhonenumberComponent } from './phonenumber/phonenumber.component';
import { CodeComponent } from './code/code.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'phone', component: PhonenumberComponent
  },
  {
    path: 'code', component: CodeComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: '', redirectTo: '/phone', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
