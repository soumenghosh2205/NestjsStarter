import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpStatus,
  HttpException,
  Delete,
} from '@nestjs/common';
import { EmployeeService, Employee } from './employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Get('/')
  getEmployees(): Employee[] {
    return this.employeeService.getEmployees();
  }

  @Get(':id')
  getEmployee(@Param() params: any): Employee {
    return this.employeeService.getEmployeeById(params.id);
  }

  @Post()
  addEmployee(@Body() employee: Employee): Employee {
    const validResult = this.validateDto(employee);

    if (validResult.valid) {
      return this.employeeService.addEmployee(employee);
    }

    throw new HttpException(validResult.errors, HttpStatus.BAD_REQUEST);
  }

  @Delete(':id')
  removeEmployee(@Param() params: any): void {
    this.employeeService.removeEmployee(params.id);
  }

  private validateDto(emp: Employee): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!emp.firstName) {
      errors.push('firstName is missing');
    }

    if (!emp.lastName) {
      errors.push('lastName is missing');
    }

    if (!emp.age) {
      errors.push('age is missing');
    } else if (emp.age < 18) {
      errors.push("minors can't be employed");
    }

    if (!emp.salary) {
      errors.push('salary is missing');
    } else if (emp.salary < 1000) {
      errors.push("minimum wage isn't met");
    }

    if (errors.length) {
      return { valid: false, errors };
    } else {
      return { valid: true, errors: [] };
    }
  }
}
