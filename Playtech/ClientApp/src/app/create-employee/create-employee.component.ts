import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { Router } from "@angular/router";
import { Department } from "../models/department";
import { Employee } from "../models/employee";
import { DepartmentService } from "../services/department.service";
import { DialogService } from "../services/dialog.service";
import { EmployeeService } from "../services/employee.service";
import { MessageService } from "../services/message.service";
import { forkJoin } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: "app-create-employee",
  templateUrl: "./create-employee.component.html",
  styleUrls: ["./create-employee.component.css"]
})
export class CreateEmployeeComponent implements OnInit {

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
    public dialogRef: MatDialogRef<CreateEmployeeComponent>,
    private readonly _router: Router) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      managerId: ["", [Validators.required]],
      departmentId: ["", [Validators.required]],
      name: ["", [Validators.required]],
      salary: [0, [Validators.min(1)]]
    });


    forkJoin([
      this._employeeService.getAllEmployees(),
      this._departmentService.getAllDepartments()
    ]).subscribe(([employees, departments]) => {
      this.managers = employees;
      this.departments = departments;

      this.managerId.setValue(this.managers[0].id);
      this.departmentId.setValue(this.departments[0].id);
    });
  }

  public onSubmit(): void {
    if (!this.form.valid) { return; }

    this._dialogService.confirm("Would you like to create employee?", "create")
      .pipe(
        tap(() => this.dialogRef.close()),
        switchMap(() =>
          this._employeeService.createEmployee(new Employee({
            name: this.name.value,
            salary: this.salary.value,
            departmentId: this.departmentId.value,
            managerId: this.managerId.value
          }))))
      .subscribe((employee: Employee) => {
        this._messageService.showSuccessMessage("Employee has been created.");
        this._router.navigate(["employees", employee.id]);
      });
  }

  public onCloseClick(): void {
    this.dialogRef.close();
  }
}
