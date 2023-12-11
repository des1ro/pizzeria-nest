import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientRepository } from './ingredient.repo';
@Injectable()
export class IngredientService {
  constructor(private readonly repository: IngredientRepository) {}
  async create(createIngredientDto: IngredientDto) {
    const ingredient = new Ingredient(createIngredientDto);
    return await this.repository.save(ingredient);
  }

  async findAll() {
    const ingredients = await this.repository.findAll();
    if (ingredients.length === 0) {
      throw new NotFoundException('Ingredients not found');
    }
    return ingredients;
  }

  async findOne(id: string): Promise<Ingredient> {
    const ingredient = await this.repository.findOne(id);
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
    return ingredient;
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.findOne(id);
    const ingredientToUpdate = Object.assign(ingredient, updateIngredientDto);
    return await this.repository.save(ingredientToUpdate);
  }

  async remove(id: string) {
    const ingredient = await this.findOne(id);
    await this.repository.remove(ingredient);
  }
}
