import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductIngredientQuantity } from './entities/product.ingredient.quantity.entity';
import { ProductRepository } from './product.repo';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new Product();
    newProduct.name = createProductDto.name;
    newProduct.price = createProductDto.price;
    newProduct.type = createProductDto.type;
    const ingredientQuantitiesToSave: ProductIngredientQuantity[] =
      await this.getProductIngredientQuantity(createProductDto);
    newProduct.ingredientQuantities = ingredientQuantitiesToSave;
    return await this.repository.saveProduct(newProduct);
  }

  async findAll() {
    return this.repository.findAllProducts();
  }

  async findOne(id: string) {
    return await this.repository.findProduct(id);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    if (updateProductDto.productIngredientQuantity) {
      const ingredientQuantities =
        await this.getProductIngredientQuantity(updateProductDto);
      product.ingredientQuantities = ingredientQuantities;
    }
    product.price = updateProductDto.price;

    return await this.repository.saveProduct(product);
  }

  async remove(id: string) {
    this.repository.remove(id);
  }
  private async getProductIngredientQuantity(
    createProductDto: CreateProductDto | UpdateProductDto,
  ): Promise<ProductIngredientQuantity[]> {
    const promises = createProductDto.productIngredientQuantity.map(
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
