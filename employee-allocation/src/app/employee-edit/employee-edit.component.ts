import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpDataService} from '../services/http-data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  @Input() employeeData: any;

  employeeForm: FormGroup;
  empId: any;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: [this.employeeData.name, Validators.required],
      percentage: [this.employeeData.percentage, Validators.required],
      progress: [this.employeeData.progress, Validators.required],
      startDate: [this.employeeData.startDate, Validators.required],
      endDate: [this.employeeData.endDate, Validators.required],
      phoneNumber: [this.employeeData.phoneNumber, Validators.required],
      employeeId: [{value: this.employeeData.empId, disabled: true}, Validators.required]
    });
  }

}
