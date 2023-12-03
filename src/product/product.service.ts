import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createProductDTO: CreateProductDto) {
    const product = new Product(createProductDTO);
    this.entityManager.save(product);
    return;
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    this.productRepository.merge(product, updateProductDto);
    this.entityManager.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    this.productRepository.delete(product);
  }
}
