import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "../models/employee";

@Injectable()
export class EmployeeService {

  constructor(private _httpClient: HttpClient) { }
  public getAllEmployees(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>("/api/employees");
  }

  public getEmployee(id: number): Observable<Employee> {
    return this._httpClient.get<Employee>("/api/employees/" + id);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this._httpClient.put<Employee>("/api/employees/" + employee.id, employee);
  }

  public createEmployee(employee: Employee): Observable<Employee> {
    return this._httpClient.post<Employee>("/api/employees", employee);
  }

  public deleteEmployee(id: number): Observable<Employee> {
    return this._httpClient.delete<Employee>("/api/employees/" + id);
  }

}
