import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {HttpDataService} from './http-data.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  countryList: ICountry[];
  employeeList: IEmployee[];
  projectList: IProject[];

  constructor(private httpService: HttpDataService) {
    this.httpService.getEmployeeData().subscribe(data => {
      this.employeeList = data.Employee;
      this.setEmployeeList(this.employeeList);
    });
  }

  setCountryList(countryList: ICountry[]) {
    localStorage.setItem('CountryList', JSON.stringify(countryList));
  }

  getCountryList(): any {
    return JSON.parse(localStorage.getItem('CountryList'));
  }

  setEmployeeList(employeeList: any) {
    localStorage.setItem('EmployeeList', JSON.stringify(employeeList));
  }

  getEmployeeList(): any {
    return JSON.parse(localStorage.getItem('EmployeeList'));
  }

  getEmployee(id: any) {
    const countryList = this.getCountryList();
    const country = _.filter(countryList, c => c.projectId.toString() === id.toString());
    return country[0].employee;
  }

  getProjectList(id: any) {
    const eList = this.getEmployeeList();
    const employee = _.filter(eList, c => c.empId.toString() === id.toString());
    return employee[0].projects;
  }

  updateEmployee(projectId: any, employee: IEmployee) {
    let countries = this.getCountryList();
    countries = JSON.parse(JSON.stringify(countries));
    const country = _.filter(countries, c => c.projectId === projectId);
    country[0].employee.push(employee);
    this.setCountryList(countries);
  }

  deleteEmployee(projectId: any, employee: IEmployee) {
    let countries = this.getCountryList();
    countries = JSON.parse(JSON.stringify(countries));
    const country = _.filter(countries, c => c.projectId === projectId);
    country[0].employee.splice(country[0].employee.indexOf(employee), 1);
    this.setCountryList(countries);
  }

  getProjects(empId: any) {
    return _.filter(this.employeeList, e => e.empId === empId)[0];
  }
}

export interface ICountry {
  countyName: string;
  cols: number;
  rows: number;
  background: string;
  employee: IEmployee[];
}

export interface IEmployee {
  empId: number;
  empName: string;
  status: string;
  projectAllocation: string;
  projectstartDate: string;
  projectendDate: string;
}

export interface IProject {
  projectId: number;
  projectName: string;
  status: string;
  projectAllocation: string;
  projectstartDate: string;
  projectendDate: string;
}
