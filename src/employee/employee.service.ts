import { Injectable } from '@nestjs/common';

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  salary: number;
}

@Injectable()
export class EmployeeService {
  employees: Employee[] = [
    {
      id: 1,
      firstName: 'Soumen',
      lastName: 'Ghosh',
      age: 35,
      salary: 4500,
    },
  ];

  lastEmployeeId: number = this.employees.length
    ? this.employees.sort((e1, e2) => e2.id - e1.id).at(0).id
    : 0;

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: number): Employee {
    return this.employees.find((e) => e.id == id);
  }

  addEmployee(employee: Employee): Employee {

    employee.id = this.lastEmployeeId = this.lastEmployeeId + 1;

    this.employees.push(employee);

    return employee;
  }

  removeEmployee(id: number): void {
    this.employees = this.employees.filter((e) => e.id != id);
  }
}
