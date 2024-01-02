import { Injectable, NotFoundException } from '@nestjs/common';
import { RemoveResponse } from '../../shared/interfaces/removeResponse.interface';
import { ProductIngredientQuantity } from './_product.ingredients/entity/product.ingredient.quantity.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repo';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const ingredientsQuantitiesToSave =
      this.getProductIngredientQuantity(createProductDto);
    const newProduct = new Product({
      name: createProductDto.name,
      price: createProductDto.price,
      type: createProductDto.type,
      ingredientsQuantities: ingredientsQuantitiesToSave,
    });

    return await this.repository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.repository.findAllProducts();
  }
  async findMany(ids: string[]): Promise<Product[]> {
    return this.repository.findMany(ids);
  }
  async findOne(id: string): Promise<Product> {
    const product = await this.repository.find(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    if (updateProductDto.productIngredientQuantity) {
      const ingredientQuantities =
        await this.getProductIngredientQuantity(updateProductDto);
      Object.assign(product.ingredientsQuantities, ingredientQuantities);
    }
    product.price = updateProductDto.price;

    return await this.repository.save(product);
  }

  async remove(id: string): Promise<RemoveResponse> {
    await this.repository.remove(id);
    return { success: true, message: 'Product removed successfully' };
  }
  private async getProductIngredientQuantity(
    productDto: CreateProductDto | UpdateProductDto,
  ): Promise<ProductIngredientQuantity[]> {
    const promises = productDto.productIngredientQuantity.map(
      async (ingredient) => {
        const foundIngredient = await this.repository.findOrFailIngredient(
          ingredient.ingredient,
        );
        return new ProductIngredientQuantity({
          ingredient: foundIngredient,
          quantity: ingredient.quantity,
        });
      },
    );

    return await Promise.all(promises);
  }
}
