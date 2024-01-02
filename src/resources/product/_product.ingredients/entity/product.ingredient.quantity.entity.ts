import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../../database/entity/abstract.entity';
import { Ingredient } from '../../../ingredient/entities/ingredient.entity';
import { Product } from '../../entities/product.entity';

@Entity()
export class ProductIngredientQuantity extends AbstractEntity<ProductIngredientQuantity> {
  @ManyToOne(
    () => Ingredient,
    (ingredient) => ingredient.ingredientQuantities,
    { eager: true },
  )
  ingredient: Ingredient;

  @ManyToOne(() => Product, (product) => product.ingredientsQuantities, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
    orphanedRowAction: 'delete',
  })
  product: Product;

  @Column()
  quantity: number;
}
