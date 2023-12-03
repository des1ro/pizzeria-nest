import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../database/entity/abstract.entity';
import { Reservation } from './reservation.entity';

@Entity()
export class DinnerTable extends AbstractEntity<DinnerTable> {
  @Column()
  name: string;
  @Column()
  seats: number;
  @Column({ default: true })
  active: boolean;
  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];
}
