import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../database/entity/abstract.entity';
import { ReservationStatus } from '../enum/reservationStatus.enum';
import { DinnerTable } from './dinnerTable.entity';

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
  @ManyToOne(() => DinnerTable, (table) => table.reservations)
  table: DinnerTable;
}
