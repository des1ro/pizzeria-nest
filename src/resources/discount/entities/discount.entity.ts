import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../database/entity/abstract.entity';
import { Order } from '../../order/entities/order.entity';
@Entity()
export class Discount extends AbstractEntity<Discount> {
  @Column()
  name: string;
  @Column({ unique: true })
  code: string;
  @Column()
  value: number;
  @Column()
  quantity: number;
  @OneToMany(() => Order, (order) => order.discount, { cascade: true })
  order: Order[];
}
