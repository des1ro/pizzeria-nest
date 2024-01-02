import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../database/entity/abstract.entity';
import { Product } from '../../product/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderProduct extends AbstractEntity<OrderProduct> {
  @ManyToOne(() => Order, (order) => order.products, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  order: Order;

  @ManyToOne(() => Product, { cascade: true, eager: true, nullable: false })
  @JoinColumn()
  product: Product;
}
