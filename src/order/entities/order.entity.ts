import {
  OneToOne,
  JoinColumn,
  Entity,
  ManyToMany,
  JoinTable,
  Column,
  BeforeInsert,
} from 'typeorm';
import { AbstractEntity } from '../../database/entity/abstract.entity';
import { Discount } from '../../discount/entities/discount.entity';
import { Product } from '../../product/entities/product.entity';
import { Reservation } from '../../reservation/entity/reservation.entity';
@Entity()
export class Order extends AbstractEntity<Order> {
  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @OneToOne(() => Discount, { nullable: true })
  @JoinColumn()
  discount: Discount;

  @Column()
  price: number;

  @OneToOne(() => Reservation, { nullable: true })
  @JoinColumn()
  reservation: Reservation;
  @BeforeInsert()
  updatePrice() {
    this.price = this.products.reduce(
      (total, product) => total + product.price,
      0,
    );

    if (this.discount && this.discount.quantity > 0) {
      this.price -= this.discount.value;
      this.discount.quantity -= 1;
    }
  }
}
