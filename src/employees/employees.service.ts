import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = new Employee(createEmployeeDto);
    this.entityManager.save(employee);
    return;
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<void> {
    const employee = await this.findOne(id);
    this.employeeRepository.merge(employee, updateEmployeeDto);
    this.entityManager.save(employee);
  }

  async remove(id: string) {
    const ingredient = await this.findOne(id);
    this.employeeRepository.delete(ingredient);
  }
}
