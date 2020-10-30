import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import { Subscription } from "rxjs";
import { Employee } from "../models/employee";
import { DialogService } from "../services/dialog.service";
import { EmployeeService } from "../services/employee.service";
import { MessageService } from "../services/message.service";
import { switchMap, tap } from "rxjs/operators";
import { CreateEmployeeComponent } from "../create-employee/create-employee.component";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit, AfterViewInit, OnDestroy {

  private _subscriptionToGetEmployees: Subscription;
  private _subscriptionToDeleteEmployee: Subscription;
  public dataSource = new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator, { static: false }) public paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) public sort: MatSort;
  public displayedColumns = ["id", "name", "salary", "department.name", "manager.name", "delete", "view"];
  constructor(
    private readonly _employeeService: EmployeeService,
    private readonly _dialogService: DialogService,
    private readonly _messageService: MessageService
  ) { }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case "department.name": return item.department.name;
        case "manager.name": return item.manager.name;
        default: return item[property];
      }
    };
  }

  public deleteEmployee(id: number): void {

    this._subscriptionToDeleteEmployee = this._dialogService.confirm("Would you like to delete the employee?", "delete")
      .pipe(
        switchMap(() => this._employeeService.deleteEmployee(id)),
        tap(() => this._messageService.showSuccessMessage("Employee has been deleted.")),
        switchMap(() => this._employeeService.getAllEmployees()))
      .subscribe((data: Employee[]) => {
        this.dataSource.data = data;
      });
  }

  public ngOnInit() {
    this._subscriptionToGetEmployees = this._employeeService.getAllEmployees()
      .subscribe((data: Employee[]) => {
        this.dataSource.data = data;
      });
  }

  public ngOnDestroy() {
    this._subscriptionToGetEmployees.unsubscribe();

    if (this._subscriptionToDeleteEmployee) {
      this._subscriptionToDeleteEmployee.unsubscribe();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openEmployeeCreationPopup(): void {
    this._dialogService.open(CreateEmployeeComponent, {
      width: "400px"
    });
  }
}
