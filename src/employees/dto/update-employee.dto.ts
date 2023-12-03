import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { EmployeeRole } from '../enum/employeeRole.enum';
import { IsEnum, IsString } from 'class-validator';
import { EmployeeStatus } from '../enum/employeeStatus.enum';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @IsString()
  readonly name: string;
  @IsEnum(EmployeeRole)
  readonly role: EmployeeRole;
  @IsEnum(EmployeeStatus)
  readonly employeeStatus: EmployeeStatus;
}
