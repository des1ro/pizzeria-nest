import { Injectable } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { EntityManager, Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
    private readonly entityManager: EntityManager,
  ) {}
  create(createDiscountDto: CreateDiscountDto) {
    const discount = new Discount(createDiscountDto);
    this.entityManager.save(discount);
    return 'This action adds a new discount';
  }

  async findAll() {
    return this.discountRepository.find();
  }

  async findOne(id: string): Promise<Discount> {
    const discount = await this.discountRepository.findOneBy({ id });
    if (!discount) {
      throw new Error(`Discount with ID ${id} not found`);
    }
    return discount;
  }

  async update(id: string, updateDiscountDto: UpdateDiscountDto) {
    const discount = await this.findOne(id);
    this.discountRepository.merge(discount, updateDiscountDto);
    this.entityManager.save(discount);
  }

  async remove(id: string) {
    const discount = await this.findOne(id);
    this.discountRepository.delete(discount);
  }
}
