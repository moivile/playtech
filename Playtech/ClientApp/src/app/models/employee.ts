import { Department } from "./department";

export class Employee {
  constructor(init?: Partial<Employee>) {
    Object.assign(this, init);
  }
  public id: number;
  public name: string;
  public salary: number | null;
  public departmentId: number | null;
  public managerId: number | null;
  public department: Department;
  public manager: Employee;
}
