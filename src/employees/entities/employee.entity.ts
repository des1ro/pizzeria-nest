import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../database/entity/abstract.entity';
import { EmployeeRole } from '../enum/employeeRole.enum';
import { EmployeeStatus } from '../enum/employeeStatus.enum';

@Entity()
export class Employee extends AbstractEntity<Employee> {
  @Column()
  name: string;
  @Column()
  role: EmployeeRole;
  @Column({ type: 'enum', enum: EmployeeStatus, default: EmployeeStatus.FREE })
  readonly employeeStatus: EmployeeStatus;
}
