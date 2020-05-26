import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeDashboardComponent} from './employee-dashboard/employee-dashboard.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: EmployeeDashboardComponent
  },
  {
    path: 'employee-list/:projectId',
    component: EmployeeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
