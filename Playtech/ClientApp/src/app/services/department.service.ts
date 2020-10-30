import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Department } from "../models/department";

@Injectable()
export class DepartmentService {

  constructor(private _httpClient: HttpClient) { }
  public getAllDepartments(): Observable<Department[]> {
    return this._httpClient.get<Department[]>("/api/departments");
  }
}
