import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
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
  async saveProduct(product: Product) {
    return await this.productRepository.save(product);
  }

  async findProduct(id: string) {
    return await this.productRepository.findOneByOrFail({ id });
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
