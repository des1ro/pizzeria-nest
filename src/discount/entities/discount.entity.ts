import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../database/entity/abstract.entity';
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
}
