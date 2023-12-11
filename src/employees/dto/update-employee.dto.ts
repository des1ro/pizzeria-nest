import { IsEnum, IsString } from 'class-validator';
import { EmployeeRole } from '../enum/employeeRole.enum';
import { EmployeeStatus } from '../enum/employeeStatus.enum';

export class UpdateEmployeeDto {
  @IsString()
  name: string;
  @IsEnum(EmployeeRole)
  role: EmployeeRole;
  @IsEnum(EmployeeStatus)
  employeeStatus: EmployeeStatus;
}
