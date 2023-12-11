import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';
@Injectable()
export class DiscountRepository {
  constructor(
    @InjectRepository(Discount)
    private readonly discountRepository: Repository<Discount>,
  ) {}

  async saveDiscount(discount: Discount) {
    return await this.discountRepository.save(discount);
  }

  async findDiscount(id: string) {
    return await this.discountRepository.findOneBy({ id });
  }

  async findAllDiscounts() {
    return await this.discountRepository.find();
  }
  async removeDiscount(discount: Discount) {
    return this.discountRepository.remove(discount);
  }
}
