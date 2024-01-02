import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn('increment')
  id: string;
  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
