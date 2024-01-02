import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientRepository {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}
  async save(ingredient: Ingredient): Promise<Ingredient> {
    return await this.ingredientRepository.save(ingredient);
  }

  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientRepository.find();
  }
  async findOneByName(name: string): Promise<Ingredient> {
    return await this.ingredientRepository.findOneBy({ name });
  }
  async findOneById(id: string): Promise<Ingredient> {
    return await this.ingredientRepository.findOneBy({ id });
  }

  async remove(ingredient: Ingredient) {
    await this.ingredientRepository.remove(ingredient);
  }
}
