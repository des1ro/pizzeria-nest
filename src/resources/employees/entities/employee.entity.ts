import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { AssignOrder } from '../../assign-order/entities/assignedOrder.entity';
import { AbstractEntity } from '../../../database/entity/abstract.entity';
import { EmployeeRole } from '../enum/employeeRole.enum';
import { User } from '../../../user/entities/user.entity';

@Entity()
export class Employee extends AbstractEntity<Employee> {
  @Column()
  name: string;
  @Column()
  role: EmployeeRole;
  @OneToMany(() => AssignOrder, (assignOrder) => assignOrder.employee, {
    nullable: true,
  })
  assignOrder: AssignOrder[];
  @OneToOne(() => User)
  user: User;
}
