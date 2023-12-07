import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductIngredientQuantity } from './entities/product.ingredient.quantity.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    let product: Product;
    await this.entityManager.transaction(async (transactionalEntityManager) => {
      const newProduct = new Product();
      newProduct.name = createProductDto.name;
      newProduct.price = createProductDto.price;
      newProduct.type = createProductDto.type;

      await transactionalEntityManager.save(Product, newProduct);
      product = await transactionalEntityManager.findOneBy(Product, newProduct);
      const ingredientQuantitiesToSave: ProductIngredientQuantity[] =
        await this.getProductIngredientQuantity(product, createProductDto);
      newProduct.ingredientQuantities = ingredientQuantitiesToSave;
      return await transactionalEntityManager.save(Product, newProduct);
    });
    return this.findOne(product.id);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    if (updateProductDto.productIngredientQuantity) {
      const ingredientQuantities = await this.getProductIngredientQuantity(
        product,
        updateProductDto,
      );
      product.ingredientQuantities = ingredientQuantities;
    }
    product.price = updateProductDto.price;

    return await this.productRepository.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    this.productRepository.remove(product);
  }
  private async getProductIngredientQuantity(
    product: Product,
    createProductDto: CreateProductDto | UpdateProductDto,
  ): Promise<ProductIngredientQuantity[]> {
    const promises = createProductDto.productIngredientQuantity.map(
      async (ingredient) => {
        const foundIngredient = await this.entityManager.findOneByOrFail(
          Ingredient,
          ingredient.ingredient,
        );
        return new ProductIngredientQuantity({
          ingredient: foundIngredient,
          quantity: ingredient.quantity,
          product: product,
        });
      },
    );
    return await Promise.all(promises);
  }
}
