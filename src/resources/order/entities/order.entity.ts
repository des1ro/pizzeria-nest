import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { AssignOrder } from '../../assign-order/entities/assignedOrder.entity';
import { AbstractEntity } from '../../../database/entity/abstract.entity';
import { Discount } from '../../discount/entities/discount.entity';
import { Reservation } from '../../reservation/entity/reservation.entity';
import { OrderProduct } from './orderProduct.entity';
@Entity()
export class Order extends AbstractEntity<Order> {
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
    eager: true,
  })
  products: OrderProduct[];

  @ManyToOne(() => Discount, { nullable: true, onUpdate: 'CASCADE' })
  @JoinColumn()
  discount: Discount;

  @Column()
  price: number;

  @OneToOne(() => Reservation, { nullable: true, cascade: true })
  @JoinColumn()
  reservation: Reservation;
  @OneToOne(() => AssignOrder, { nullable: true, cascade: true })
  @JoinColumn()
  assignOrder: AssignOrder;
}
