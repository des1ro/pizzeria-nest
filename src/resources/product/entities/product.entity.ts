import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEnum } from '../enum/product.enum';
import { ProductIngredientQuantity } from '../_product.ingredients/entity/product.ingredient.quantity.entity';
import { AbstractEntity } from '../../../database/entity/abstract.entity';
@Entity()
export class Product extends AbstractEntity<Product> {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @OneToMany(
    () => ProductIngredientQuantity,
    (ingredientQuantity) => ingredientQuantity.product,
    {
      cascade: true,
    },
  )
  ingredientsQuantities: Promise<ProductIngredientQuantity[]>;
  @Column({ type: 'enum', enum: ProductEnum })
  type: ProductEnum;
}
