import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IngredientService } from '../ingredient.service';
import { CreateIngredientStockDto } from './dto/create-ingredient-stock.dto';
import { UpdateIngredientStockDto } from './dto/update-ingredient-stock.dto';
import { IngredientStock } from './entities/ingredient.stock.entity';
import { IngredientStockRepository } from './ingredient-stock.repo';
import { RemoveResponse } from '../../../shared/interfaces/removeResponse.interface';
import { EntityManager, UpdateResult } from 'typeorm';
import { ProductIngredientQuantity } from '../../product/_product.ingredients/entity/product.ingredient.quantity.entity';
@Injectable()
export class IngredientStockService {
  constructor(
    private readonly repositoryIngredientStock: IngredientStockRepository,
    private readonly ingredientService: IngredientService,
  ) {}
  async create(
    createIngredientStockDto: CreateIngredientStockDto,
  ): Promise<IngredientStock> {
    const ingredientStockInDataBase =
      await this.repositoryIngredientStock.findByIngredientId(
        createIngredientStockDto.ingredientId,
      );
    if (ingredientStockInDataBase) {
      throw new BadRequestException(
        `Ingredient ${ingredientStockInDataBase.ingredient.name} already exist in ingredient stock`,
      );
    }
    const ingredient = await this.ingredientService.findOneById(
      createIngredientStockDto.ingredientId,
    );
    const ingredientStock = new IngredientStock({
      ingredient: ingredient,
      quantity: createIngredientStockDto.quantity,
    });
    return await this.repositoryIngredientStock.save(ingredientStock);
  }

  async findAllWithRelations(): Promise<IngredientStock[]> {
    const ingredientsStock =
      await this.repositoryIngredientStock.findAllWithRelatrions();
    if (ingredientsStock.length === 0) {
      throw new NotFoundException('Not found any ingredients in stock');
    }
    return ingredientsStock;
  }

  async findOne(id: string): Promise<IngredientStock> {
    const ingredientStock =
      await this.repositoryIngredientStock.findOneWithRelation(id);
    if (!ingredientStock) {
      throw new NotFoundException(`Ingredient stock with id ${id} not found`);
    }
    return ingredientStock;
  }

  async update(
    id: string,
    updateIngredientStockDto: UpdateIngredientStockDto,
  ): Promise<IngredientStock> {
    const ingredientStock = await this.findOne(id);
    const ingredientStockToUpdate = Object.assign(
      ingredientStock,
      updateIngredientStockDto,
    );
    return await this.repositoryIngredientStock.save(ingredientStockToUpdate);
  }
  async updateManyTransaction(
    productIngredientQuantities: ProductIngredientQuantity[],
    transactionalEntityManager: EntityManager,
  ): Promise<UpdateResult[]> {
    const ingredients = productIngredientQuantities.map(
      async (productIngredientQuantity) => {
        const ingredientToUpdate = await transactionalEntityManager.findOne(
          IngredientStock,
          {
            where: {
              ingredient: { id: productIngredientQuantity.ingredient.id },
            },
          },
        );
        if (ingredientToUpdate.quantity < productIngredientQuantity.quantity) {
          throw new NotFoundException(
            `Insufficient ${productIngredientQuantity.ingredient.name} component in stock.`,
          );
        }
        return transactionalEntityManager.decrement(
          IngredientStock,
          { id: ingredientToUpdate.id },
          'quantity',
          productIngredientQuantity.quantity,
        );
      },
    );
    return Promise.all(ingredients);
  }
  async remove(id: string): Promise<RemoveResponse> {
    const ingredientStock = await this.findOne(id);
    await this.repositoryIngredientStock.remove(ingredientStock);
    return { success: true, message: 'Ingredient removed successfully' };
  }
}
