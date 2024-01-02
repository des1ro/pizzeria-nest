import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientRepository } from './ingredient.repo';
import { RemoveResponse } from '../../shared/interfaces/removeResponse.interface';
@Injectable()
export class IngredientService {
  constructor(private readonly repository: IngredientRepository) {}
  async create(createIngredientDto: IngredientDto) {
    const ingredientInDb = await this.repository.findOneByName(
      createIngredientDto.name,
    );
    if (ingredientInDb) {
      throw new BadRequestException(
        `Ingredient '${ingredientInDb.name}' it's already in database`,
      );
    }
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

  async findOneById(id: string): Promise<Ingredient> {
    const ingredient = await this.repository.findOneById(id);
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
    return ingredient;
  }
  async findOneByName(name: string): Promise<Ingredient> {
    const ingredient = await this.repository.findOneByName(name);
    if (!ingredient) {
      throw new NotFoundException(`Ingredient '${name}' not found`);
    }
    return ingredient;
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.findOneById(id);
    const ingredientToUpdate = Object.assign(ingredient, updateIngredientDto);
    return await this.repository.save(ingredientToUpdate);
  }

  async remove(id: string): Promise<RemoveResponse> {
    const ingredient = await this.findOneById(id);
    await this.repository.remove(ingredient);
    return { success: true, message: 'Ingredient removed successfully' };
  }
}
