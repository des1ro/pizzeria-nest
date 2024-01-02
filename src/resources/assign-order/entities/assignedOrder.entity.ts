import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../database/entity/abstract.entity';
import { TaskStatus } from '../enum/taskStatus.enum';
import { Employee } from '../../employees/entities/employee.entity';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class AssignOrder extends AbstractEntity<AssignOrder> {
  @ManyToOne(() => Employee, (employee) => employee.assignOrder, {
    cascade: ['remove'],
    nullable: false,
  })
  employee: Employee;
  @OneToOne(() => Order, { eager: true, nullable: false })
  @JoinColumn()
  order: Order;
  @Column({ type: 'enum', enum: TaskStatus })
  status: TaskStatus;
}
