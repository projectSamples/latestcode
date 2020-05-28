import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeDataService, IEmployee} from '../services/employee-data.service';
import {ActivatedRoute, ParamMap, Route} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpDataService} from '../services/http-data.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  rowData: IEmployee[] = [];
  projectId: any;
  showAddNew = false;
  dataSource: MatTableDataSource<IEmployee>;
  employeeForm: FormGroup;
  employeeAddForm: FormGroup;
  employeeEditForm: FormGroup;
  showEmpDetails = false;
  showEmpEdit = false;
  employeeData: any = {};
  empId: number;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnDefs: string[] = ['empId', 'age', 'empName', 'status',
    'projectAllocation', 'projectstartDate', 'projectendDate', 'location', 'emailAddress', 'phoneNumber', 'managerName', 'projectLocation', 'geId', 'vpnCode',
    'deleteDetail', 'viewDetail', 'editDetail'];

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private dataShare: EmployeeDataService,
              private httpService: HttpDataService) {
    this.route.params.subscribe((param: any) => {
      this.projectId = param.projectId;
      this.refreshData(param.projectId);
    });
  }

  ngOnInit(): void {
    this.employeeAddForm = this.fb.group({});
    this.employeeEditForm = this.fb.group({});
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      location: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9 ]{11}')]],
      managerName: ['', Validators.required],
      geId: ['', Validators.required],
      vpnCode: ['', Validators.required],
      projectLocation: ['', Validators.required],
      percentage: ['', Validators.required],
      progress: [[], Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      employeeId: ['', Validators.required]
    });
  }

  refreshData(projectId) {
    this.httpService.getEmployeeByProjectId(projectId).subscribe((response) => {
      this.rowData = response;
      this.dataSource = new MatTableDataSource<IEmployee>(this.rowData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.firstPage();
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteRow(employee, j) {
    this.httpService.deleteEmployee(employee.id).subscribe(() => {
      this.refreshData(this.projectId);
    });
  }

  onAddNew($event) {
    this.showAddNew = false;
    if (!this.employeeData) { return; }
    this.httpService.getProjectById(this.projectId).subscribe((data: {id: number, name: string}) => {
      this.httpService.addEmployee({
        empId: this.employeeData.empId,
        name: this.employeeData.name,
        location: this.employeeData.location,
        emailAddress: this.employeeData.emailAddress,
        phoneNumber: this.employeeData.phoneNumber,
        managerName: this.employeeData.managerName,
        projectLocation: this.employeeData.projectLocation,
        progress: this.employeeData.progress,
        percentage: this.employeeData.percentage,
        startDate: this.employeeData.startDate,
        geId: this.employeeData.geId,
        vpnCode: this.employeeData.vpnCode,
        endDate: this.employeeData.endDate,
        projectId: this.projectId,
        projectName: data.name
      }).subscribe(() => {
        this.employeeForm.reset();
        this.refreshData(this.projectId);
      });
    });
  }

  viewDetail(element) {
    this.empId = element.empId;
    this.showEmpDetails = true;
  }

  editDetails(element) {
    this.showEmpEdit = true;
    this.employeeData = element;
    this.employeeForm = this.fb.group({
      name: [this.employeeData.name, Validators.required],
      age: [this.employeeData.age, Validators.required],
      location: [this.employeeData.location, Validators.required],
      emailAddress: [this.employeeData.emailAddress, Validators.required],
      managerName: [this.employeeData.managerName, Validators.required],
      projectLocation: [this.employeeData.projectLocation, Validators.required],
      percentage: [this.employeeData.percentage, Validators.required],
      geId: [this.employeeData.geId, Validators.required],
      vpnCode: [this.employeeData.vpnCode, Validators.required],
      progress: [this.employeeData.progress, Validators.required],
      startDate: [this.employeeData.startDate, Validators.required],
      endDate: [this.employeeData.endDate, Validators.required],
      phoneNumber: [this.employeeData.phoneNumber, Validators.required],
      employeeId: [{value: this.employeeData.empId, disabled: true}, Validators.required]
    });
  }

  onUpdateEmployeeDetails($event) {
    this.showEmpEdit = false;
    this.httpService.updateEmployee(this.employeeData.id, this.employeeData).subscribe(() => {
      console.log('Employee Updated');
    });
  }

  onEmployeeDetails($event) {
    this.showEmpDetails = false;
  }
}

export interface IColumn {
  key: string;
  value: string;
  width: number;
}
