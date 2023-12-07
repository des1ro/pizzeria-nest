import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { IngredientDto } from './dto/create-ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    private readonly entityMenager: EntityManager,
  ) {}
  async create(createIngredientDto: IngredientDto) {
    const ingredient = new Ingredient(createIngredientDto);
    return await this.ingredientRepository.save(ingredient);
  }

  findAll() {
    return this.ingredientRepository.find();
  }

  async findOne(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOneBy({ id });
    if (!ingredient) {
      throw new Error(`Ingredient with ID ${id} not found`);
    }
    return ingredient;
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.findOne(id);
    ingredient.name = updateIngredientDto.name;
    return await this.entityMenager.save(ingredient);
  }

  async remove(id: string) {
    const ingredient = await this.findOne(id);
    this.ingredientRepository.remove(ingredient);
  }
}
