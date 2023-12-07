import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../database/entity/abstract.entity';
import { ReservationStatus } from '../enum/reservationStatus.enum';

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
}
