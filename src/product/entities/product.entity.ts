import { Column, JoinTable, ManyToMany } from 'typeorm';
import { ProductEnum } from '../enum/product.enum';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';
import { AbstractEntity } from '../../database/entity/abstract.entity';

export class Product extends AbstractEntity<Product> {
  @Column()
  name: string;
  @Column()
  price: number;
  @Column({ type: 'enum', enum: ProductEnum })
  type: ProductEnum;
  @ManyToMany(() => Ingredient, { eager: true })
  @JoinTable()
  ingredients: Ingredient[];
}
