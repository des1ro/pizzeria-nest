import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UpdateIngredientStockDto } from './dto/update-ingredient-stock.dto';
import { IngredientStock } from './entities/ingredient.stock.entity';
import { CreateIngredientStockDto } from './dto/create-ingredient-stock.dto';
import { Ingredient } from '../entities/ingredient.entity';

@Injectable()
export class IngredientStockService {
  constructor(
    @InjectRepository(IngredientStock)
    private readonly ingredientStockRepository: Repository<IngredientStock>,
    private readonly entityMenager: EntityManager,
  ) {}
  async create(createIngredientStockDto: CreateIngredientStockDto) {
    const ingredient = await this.entityMenager.findOneByOrFail(
      Ingredient,
      createIngredientStockDto.ingredient,
    );
    const ingredientStock = this.ingredientStockRepository.create({
      ingredient: ingredient,
      amount: createIngredientStockDto.amount,
    });
    return await this.ingredientStockRepository.save(ingredientStock);
  }

  findAll() {
    return this.ingredientStockRepository.find({
      relations: {
        ingredient: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.ingredientStockRepository.findOneByOrFail({
      id: id,
    });
  }

  async update(id: string, updateIngredientStockDto: UpdateIngredientStockDto) {
    const ingredientStockToUpdate = await this.findOne(id);
    ingredientStockToUpdate.amount = updateIngredientStockDto.amount;

    return await this.ingredientStockRepository.save(ingredientStockToUpdate);
  }

  async remove(id: string) {
    const ingredientStock = await this.findOne(id);
    return await this.ingredientStockRepository.remove(ingredientStock);
  }
}
