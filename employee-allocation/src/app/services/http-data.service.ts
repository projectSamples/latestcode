import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IEmployee, IProject} from './employee-data.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  constructor(private http: HttpClient) { }

  getCountryData(): Observable<any> {
    return this.http.get(environment.baseUrl + environment.projects.getDetails);
  }

  getEmployeeData(): Observable<any> {
    return this.http.get(environment.baseUrl + environment.projects.getDetails);
  }

  addEmployee(request: any) {
    return this.http.post(environment.baseUrl + environment.employee.save, request);
  }

  deleteEmployee(employeeId: any) {
    return this.http.delete(environment.baseUrl + environment.employee.delete + '?id=' + employeeId);
  }

  getEmployeeByProjectId(projectId: number): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(environment.baseUrl + environment.employee.getByProjectId + '?id=' + projectId);
  }

  getProjectListByEmployee(employeeId:any){
    return this.http.get(environment.baseUrl + environment.employee.getById + '?id='+ employeeId);
  }

  createProject(request:any){
    return this.http.post(environment.baseUrl + environment.projects.save, request)
  }

  getProjectById(projectid:any){
    return this.http.get(environment.baseUrl + environment.projects.getById + '?id='+ projectid);
  }
}
