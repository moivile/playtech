import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { EmployeeService } from "./services/employee.service";
import { DepartmentService } from "./services/department.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


// tslint:disable-next-line: max-line-length
import { MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatSelectModule, MatSidenavModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule } from "@angular/material";
import { ConfirmationDialogComponent } from "./confirmation-dialog/confirmation-dialog.component";
import { AddNewButtonComponent } from "./add-new-button/add-new-button.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeDetailsComponent } from "./employee-details/employee-details.component";
import { MessageService } from "./services/message.service";
import { DialogService } from "./services/dialog.service";
import { ToastrModule } from "ngx-toastr";
import { CreateEmployeeComponent } from "./create-employee/create-employee.component";



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ConfirmationDialogComponent,
    AddNewButtonComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    CreateEmployeeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "employees", component: EmployeeListComponent },
      { path: "employees/:id", component: EmployeeDetailsComponent }
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatSelectModule
  ],
  providers: [EmployeeService,
    DepartmentService,
    MessageService,
    DialogService],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmationDialogComponent,
    CreateEmployeeComponent
  ]
})
export class AppModule { }
