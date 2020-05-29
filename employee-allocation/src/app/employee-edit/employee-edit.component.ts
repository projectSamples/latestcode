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
  @Input() employeeForm: FormGroup;

  empId: any;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

}
