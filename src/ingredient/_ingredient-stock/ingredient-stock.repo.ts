import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientStock } from './entities/ingredient.stock.entity';

@Injectable()
export class IngredientStockRepository {
  constructor(
    @InjectRepository(IngredientStock)
    private readonly ingredientStockRepository: Repository<IngredientStock>,
  ) {}
  async save(ingredientStock: IngredientStock) {
    return await this.ingredientStockRepository.save(ingredientStock);
  }

  findAllWithRelatrions() {
    return this.ingredientStockRepository.find({
      relations: {
        ingredient: true,
      },
    });
  }

  async findOneWithRelation(id: string) {
    return await this.ingredientStockRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        ingredient: true,
      },
    });
  }

  async remove(ingredientStock: IngredientStock) {
    return await this.ingredientStockRepository.remove(ingredientStock);
  }
}
