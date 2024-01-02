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

  async save(discount: Discount) {
    return this.discountRepository.save(discount);
  }

  async findById(id: string) {
    return this.discountRepository.findOneBy({ id });
  }
  async findByCode(code: string) {
    return this.discountRepository.findOneBy({ code });
  }
  async findAll() {
    return this.discountRepository.find();
  }
  async remove(discount: Discount) {
    return this.discountRepository.remove(discount);
  }
}
