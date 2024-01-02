import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Discount } from './entities/discount.entity';
import { DiscountRepository } from './discount.repo';
import { RemoveResponse } from '../../shared/interfaces/removeResponse.interface';
import { EntityManager } from 'typeorm';
@Injectable()
export class DiscountService {
  constructor(private readonly repository: DiscountRepository) {}
  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    const discountInDatabase = await this.repository.findByCode(
      createDiscountDto.code,
    );
    if (discountInDatabase) {
      throw new BadRequestException(
        `Discount with code: '${createDiscountDto.code}' already exist`,
      );
    }
    const discount = new Discount(createDiscountDto);
    return await this.repository.save(discount);
  }

  async findAll(): Promise<Discount[]> {
    const discouts = await this.repository.findAll();
    if (discouts.length === 0) {
      throw new NotFoundException(`Discounts not found`);
    }
    return discouts;
  }
  async findAndUseDiscountTransactional(
    code: string,
    transactionalEntityManager: EntityManager,
  ): Promise<Discount> {
    const discount = await this.findOneByCode(code);
    discount.quantity -= 1;
    if (discount.quantity < 0) {
      throw new BadRequestException(
        `Discount code:${discount.code} already expired`,
      );
    }
    return transactionalEntityManager.save(Discount, discount);
  }
  async findOne(id: string): Promise<Discount> {
    const discount = await this.repository.findById(id);
    if (!discount) {
      throw new NotFoundException(`Discount with id: ${id} not found`);
    }
    return discount;
  }
  async findOneByCode(code: string) {
    const discount = await this.repository.findByCode(code);
    if (!discount) {
      throw new NotFoundException(`Discount with code: ${code} not found`);
    }
    return discount;
  }
  async update(
    id: string,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    const discount = await this.findOne(id);
    discount.quantity = updateDiscountDto.quantity;
    return await this.repository.save(discount);
  }

  async remove(id: string): Promise<RemoveResponse> {
    const discount = await this.findOne(id);
    await this.repository.remove(discount);
    return { success: true, message: 'Discount removed successfully' };
  }
}
