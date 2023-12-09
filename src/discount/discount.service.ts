import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './entities/discount.entity';
import { DiscountRepository } from './discount.repo';
import { RemoveResponse } from '../shared/removeResponse.interface';
@Injectable()
export class DiscountService {
  constructor(private readonly repository: DiscountRepository) {}
  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    const discount = new Discount(createDiscountDto);
    return await this.repository.saveDiscount(discount);
  }

  async findAll(): Promise<Discount[]> {
    const discouts = await this.repository.findAllDiscounts();
    if (discouts.length === 0) {
      throw new NotFoundException(`Discounts not found`);
    }
    return discouts;
  }

  async findOne(id: string): Promise<Discount> {
    const discount = await this.repository.findDiscount(id);
    if (!discount) {
      throw new NotFoundException(`Discounts with id: ${id} not found`);
    }
    return discount;
  }

  async update(
    id: string,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    const discount = await this.findOne(id);
    discount.quantity = updateDiscountDto.quantity;
    return await this.repository.saveDiscount(discount);
  }

  async remove(id: string): Promise<RemoveResponse> {
    const discount = await this.findOne(id);
    await this.repository.removeDiscount(discount);
    return { success: true, message: 'Discount removed successfully' };
  }
}
