export class Department {
  constructor(init?: Partial<Department>) {
    Object.assign(this, init);
  }
  public id: number;
  public name: string;
}
