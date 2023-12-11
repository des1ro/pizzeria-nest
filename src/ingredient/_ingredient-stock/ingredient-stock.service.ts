import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientService } from '../ingredient.service';
import { CreateIngredientStockDto } from './dto/create-ingredient-stock.dto';
import { UpdateIngredientStockDto } from './dto/update-ingredient-stock.dto';
import { IngredientStock } from './entities/ingredient.stock.entity';
import { IngredientStockRepository } from './ingredient-stock.repo';
import { RemoveResponse } from '../../shared/removeResponse.interface';
@Injectable()
export class IngredientStockService {
  constructor(
    private readonly repositoryIngredientStock: IngredientStockRepository,
    private readonly ingredientService: IngredientService,
  ) {}
  async create(
    createIngredientStockDto: CreateIngredientStockDto,
  ): Promise<IngredientStock> {
    const ingredient = await this.ingredientService.findOne(
      createIngredientStockDto.ingredient.id,
    );
    const ingredientStock = new IngredientStock({
      ingredient: ingredient,
      amount: createIngredientStockDto.amount,
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

  async remove(id: string): Promise<RemoveResponse> {
    const ingredientStock = await this.findOne(id);
    await this.repositoryIngredientStock.remove(ingredientStock);
    return { success: true, message: 'Dinner Table removed successfully' };
  }
}
