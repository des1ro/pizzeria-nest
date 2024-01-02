import { Injectable, NotFoundException } from '@nestjs/common';
import { RemoveResponse } from '../../shared/interfaces/removeResponse.interface';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesRepository } from './employee.repo';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(private readonly repository: EmployeesRepository) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = new Employee(createEmployeeDto);
    return await this.repository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    const employees = await this.repository.findAll();
    if (employees.length === 0) {
      throw new NotFoundException('Not found any Employees');
    }
    return employees;
  }

  async findOne(id: string): Promise<Employee> {
    const employee = this.repository.findOne(id);
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.findOne(id);
    const employeeToUpdate = Object.assign(employee, updateEmployeeDto);
    return await this.repository.save(employeeToUpdate);
  }

  async remove(id: string): Promise<RemoveResponse> {
    const employee = await this.findOne(id);
    await this.repository.remove(employee);
    return { success: true, message: 'Employee removed successfuly' };
  }
}
