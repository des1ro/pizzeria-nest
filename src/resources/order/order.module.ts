import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountModule } from '../discount/discount.module';
import { IngredientModule } from '../ingredient/ingredient.module';
import { ProductModule } from '../product/product.module';
import { ReservationModule } from '../reservation/reservation.module';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderProcessor } from './order.processor';
import { OrderRepository } from './order.repo';
import { OrderService } from './order.service';
import { OrderProduct } from './entities/orderProduct.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderProduct]),
    DiscountModule,
    ReservationModule,
    IngredientModule,
    ProductModule,
  ],

  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrderProcessor],
  exports: [OrderService],
})
export class OrderModule {}
