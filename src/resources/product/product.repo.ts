import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { IngredientDto } from '../ingredient/dto/create-ingredient.dto';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly entityManager: EntityManager,
  ) {}
  async save(product: Product) {
    return await this.productRepository.save(product);
  }

  async find(id: string) {
    return await this.productRepository.findOne({
      where: { id: id },
      relations: { ingredientsQuantities: true },
    });
  }
  async findMany(ids: string[]) {
    return await this.productRepository.findBy({ id: In(ids) });
  }
  async findAllProducts() {
    return await this.productRepository.find();
  }
  async remove(id: string) {
    const product = await this.productRepository.findOneByOrFail({ id });
    return this.productRepository.remove(product);
  }
  async findOrFailIngredient(IngredientDto: IngredientDto) {
    return await this.entityManager.findOneByOrFail(Ingredient, IngredientDto);
  }
}
