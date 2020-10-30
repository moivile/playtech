import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Department } from "../models/department";
import { Employee } from "../models/employee";
import { DepartmentService } from "../services/department.service";
import { DialogService } from "../services/dialog.service";
import { EmployeeService } from "../services/employee.service";
import { MessageService } from "../services/message.service";

@Component({
  selector: "app-employee-details",
  templateUrl: "./employee-details.component.html",
  styleUrls: ["./employee-details.component.css"]
})
export class EmployeeDetailsComponent implements OnInit {

  public employee: Employee;
  public form: FormGroup;
  public managers: Employee[];
  public departments: Department[];
  public get managerId(): FormControl {
    return this.form.controls["managerId"] as FormControl;
  }
  public get departmentId(): FormControl {
    return this.form.controls["departmentId"] as FormControl;
  }
  public get name(): FormControl {
    return this.form.controls["name"] as FormControl;
  }

  public get salary(): FormControl {
    return this.form.controls["salary"] as FormControl;
  }

  constructor(private readonly _formBuilder: FormBuilder,
    private readonly _employeeService: EmployeeService,
    private readonly _departmentService: DepartmentService,
    private readonly _dialogService: DialogService,
    private readonly _messageService: MessageService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      managerId: ["", [Validators.required]],
      departmentId: ["", [Validators.required]],
      name: ["", [Validators.required]],
      salary: [0, [Validators.min(1)]]
    });

    this._activatedRoute.paramMap
      .pipe(
        map(paramMap => +paramMap.get("id")),
        switchMap(id => forkJoin([
          this._employeeService.getEmployee(id),
          this._employeeService.getAllEmployees(),
          this._departmentService.getAllDepartments()
        ])))
      .subscribe(([employee, managers, departments]) => {
        this.managers = managers.filter(x => x.id !== employee.id);
        this.departments = departments;

        this.form.patchValue(employee);
        this.employee = employee;
      });
  }

  public onSubmit(): void {

    const employee = new Employee({
      name: this.name.value,
      salary: this.salary.value,
      departmentId: this.departmentId.value,
      managerId: this.managerId.value,
      id: this.employee.id
    });

    this._dialogService.confirm("Would you like to update employee?", "Update")
      .pipe(switchMap(() => this._employeeService.updateEmployee(employee)))
      .subscribe(() => {
        this._messageService.showSuccessMessage("Employee has been updated.");
      });
  }

  public deleteEmployee(): void {

    this._dialogService
      .confirm("Would you like to delete employee?", "Delete")
      .pipe(switchMap(() => this._employeeService.deleteEmployee(this.employee.id)))
      .subscribe(() => {
        this._router.navigate(["employees"]);
        this._messageService.showSuccessMessage("Employee has been deleted.");
      });
  }
}
