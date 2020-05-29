import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeDataService, IEmployee} from '../services/employee-data.service';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    const formGroup = this.fb.group({
      employeeId: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      location: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9 ]{10}')]],
      managerName: ['', Validators.required],
      geId: ['', Validators.required],
      vpnCode: ['', Validators.required],
      projectLocation: ['', Validators.required],
      percentage: ['', Validators.required],
      progress: [[], Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.employeeForm = this.employeeAddForm = formGroup;
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
    if (!$event) { return; }
    this.httpService.getProjectById(this.projectId).subscribe((data: {id: number, name: string}) => {
      this.httpService.addEmployee({
        empId: this.employeeAddForm.get('employeeId').value,
        name: this.employeeAddForm.get('name').value,
        age: this.employeeAddForm.get('age').value,
        location: this.employeeAddForm.get('location').value,
        emailAddress: this.employeeAddForm.get('emailAddress').value,
        phoneNumber: this.employeeAddForm.get('phoneNumber').value,
        managerName: this.employeeAddForm.get('managerName').value,
        projectLocation: this.employeeAddForm.get('projectLocation').value,
        progress: this.employeeAddForm.get('progress').value,
        percentage: this.employeeAddForm.get('percentage').value,
        startDate: this.employeeAddForm.get('startDate').value,
        geId: this.employeeAddForm.get('geId').value,
        vpnCode: this.employeeAddForm.get('vpnCode').value,
        endDate: this.employeeAddForm.get('endDate').value,
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
    this.employeeEditForm = this.fb.group({
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
    if ($event) {
      this.httpService.updateEmployee(this.employeeData.id, this.employeeData).subscribe(() => {
        console.log('Employee Updated');
      });
    }
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
