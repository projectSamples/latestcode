import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import {AppMaterialModules} from './material.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AgGridModule } from '@ag-grid-community/angular';
import {HttpDataService} from './services/http-data.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalComponent} from './shared/modal/modal.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    EmployeeListComponent,
    ModalComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModules,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [HttpDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
