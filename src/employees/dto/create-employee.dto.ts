import { IsEnum, IsString } from 'class-validator';
import { EmployeeRole } from '../enum/employeeRole.enum';

export class CreateEmployeeDto {
  @IsString()
  name: string;
  @IsEnum(EmployeeRole)
  role: EmployeeRole;
}
