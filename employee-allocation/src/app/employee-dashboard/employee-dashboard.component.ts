import { Component, OnInit } from '@angular/core';
import {ICountry} from '../services/employee-data.service';
import {HttpDataService} from '../services/http-data.service';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  projectForm: FormGroup;
  projects: ICountry[] = [];
  showAddNew = false;
  constructor(private userData: HttpDataService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      projectid: ['', Validators.required],
      projectname: ['', Validators.required]
    });
    this.reloadData();
  }

  reloadData() {
    this.userData.getCountryData().subscribe(data => {
      this.projects = data;
      this.projects.map((c: any, index: any) => {
        c.cols = 2;
        c.rows = 1;
        c.background = this.getColor();
      });
    });
  }

  getColor() {
    const random = Math.round(Math.random() * 3);
    const colors = ['linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)', 'linear-gradient(90deg, #d53369 0%, #daae51 100%)', 'linear-gradient(90deg, #9ebd13 0%, #008552 100%)', 'linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)'];
    return colors[random];
  }

  projectSelected(project: any) {
    this.router.navigate(['/employee-list', project.id]);
  }

  onAddNew() {
    this.showAddNew = false;
    if (this.projectForm.invalid) { return; }
    this.userData.createProject({id: this.projectForm.controls.projectid.value, name: this.projectForm.controls.projectname.value}).subscribe(() => {
      this.projectForm.reset();
      this.reloadData();
    });
  }
}
