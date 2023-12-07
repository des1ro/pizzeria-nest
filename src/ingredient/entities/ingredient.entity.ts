import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../database/entity/abstract.entity';
import { IngredientStock } from '../_ingredient-stock/entities/ingredient.stock.entity';
import { ProductIngredientQuantity } from '../../product/entities/product.ingredient.quantity.entity';
@Entity()
export class Ingredient extends AbstractEntity<Ingredient> {
  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => ProductIngredientQuantity,
    (productIngredientQuantity) => productIngredientQuantity.ingredient,
  )
  ingredientQuantities: ProductIngredientQuantity[];

  @OneToOne(
    () => IngredientStock,
    (ingredientStock) => ingredientStock.ingredient,
    { cascade: true },
  )
  @JoinColumn()
  ingredientStocks: IngredientStock;
}
