import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../database/entity/abstract.entity';

@Entity()
export class DinnerTable extends AbstractEntity<DinnerTable> {
  @Column({ unique: true })
  name: string;
  @Column()
  seats: number;
  @Column({ default: true })
  active: boolean;
}
