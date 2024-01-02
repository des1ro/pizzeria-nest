import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { Discount } from './entities/discount.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountRepository } from './discount.repo';

@Module({
  imports: [TypeOrmModule.forFeature([Discount])],

  controllers: [DiscountController],
  providers: [DiscountService, DiscountRepository],
  exports: [DiscountService],
})
export class DiscountModule {}
