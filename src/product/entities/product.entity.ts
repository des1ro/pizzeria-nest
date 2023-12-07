import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductIngredientQuantity } from './product.ingredient.quantity.entity';
import { ProductEnum } from '../enum/product.enum';
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  name: string;

  @Column()
  price: number;
  @OneToMany(
    () => ProductIngredientQuantity,
    (ingredientQuantity) => ingredientQuantity.product,
    {
      cascade: true,
      eager: true,
    },
  )
  ingredientQuantities: ProductIngredientQuantity[];
  @Column({ type: 'enum', enum: ProductEnum })
  type: ProductEnum;
}
