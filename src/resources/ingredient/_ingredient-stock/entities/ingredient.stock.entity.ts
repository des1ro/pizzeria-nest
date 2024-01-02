import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../../../database/entity/abstract.entity';
import { Ingredient } from '../../entities/ingredient.entity';

@Entity()
export class IngredientStock extends AbstractEntity<IngredientStock> {
  @OneToOne(() => Ingredient, (ingredient) => ingredient.ingredientStocks, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  ingredient: Ingredient;

  @Column()
  quantity: number;
}
