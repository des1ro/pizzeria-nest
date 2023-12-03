import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { EntityManager, Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    private readonly ingredientRepository: Repository<Ingredient>,
    private readonly entityMenager: EntityManager,
  ) {}
  create(createIngredientDto: CreateIngredientDto) {
    const ingredient = new Ingredient(createIngredientDto);
    this.entityMenager.save(ingredient);
    return 'This action adds a new ingredient';
  }

  findAll() {
    return `This action returns all ingredient`;
  }

  findOne(id: string): Promise<Ingredient> {
    const ingredient = this.ingredientRepository.findOneBy({ id });
    if (!ingredient) {
      throw new Error(`Ingredient with ID ${id} not found`);
    }
    return ingredient;
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.findOne(id);
    ingredient.quantity = updateIngredientDto.quantity;
    this.entityMenager.save(ingredient);
    return `This action updates a #${id} ingredient`;
  }

  async remove(id: string) {
    const ingredient = await this.findOne(id);
    this.ingredientRepository.remove(ingredient);
    return `This action removes a #${id} ingredient`;
  }
}
