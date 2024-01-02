import {
  AfterRemove,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { AbstractEntity } from '../../../database/entity/abstract.entity';
import { ReservationStatus } from '../enum/reservationStatus.enum';
import { DinnerTable } from '../../dinner-table/entities/dinner-table.entity';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Reservation extends AbstractEntity<Reservation> {
  @Column()
  name: string;
  @Column()
  seats: number;
  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.ACTIVE,
  })
  status: ReservationStatus;

  @ManyToOne(() => DinnerTable, (dinnerTable) => dinnerTable.reservation, {
    cascade: true,
    eager: true,
  })
  dinnerTable: DinnerTable;
  @OneToOne(() => Order)
  order: Order;
  @BeforeInsert()
  @BeforeUpdate()
  markTable() {
    this.updateDinnerTableStatus();
  }
  @AfterRemove()
  releaseDinnerTable() {
    this.dinnerTable.active = true;
  }
  private updateDinnerTableStatus() {
    this.dinnerTable.active =
      this.status === ReservationStatus.COMPLETED ? true : false;
  }
}
