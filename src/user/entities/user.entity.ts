import { Column, Entity, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../database/entity/abstract.entity';
import { Employee } from '../../resources/employees/entities/employee.entity';
import { UserRole } from '../enum/user-role.enum';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  email: string;
  @Column()
  hashPassword: string;
  @Column()
  refreshToken: string;
  @Column({ default: UserRole.CLIENT })
  role: UserRole;
  @OneToOne(() => Employee, { nullable: true })
  employee: Employee;
}
