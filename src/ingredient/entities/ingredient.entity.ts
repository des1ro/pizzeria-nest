import { Column } from 'typeorm';
import { AbstractEntity } from '../../database/entity/abstract.entity';

export class Ingredient extends AbstractEntity<Ingredient> {
  @Column({ unique: true })
  name: string;

  @Column()
  quantity: number;
}
