import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignOrder } from './entities/assignedOrder.entity';
import { AssignOrderService } from './assignOrder.service';
import { AssignOrderRepository } from './assignOrder.repo';
import { EmployeesModule } from '../employees/employees.module';
import { OrderModule } from '../order/order.module';
import { AssignOrderController } from './assignOrder.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssignOrder]),
    EmployeesModule,
    OrderModule,
  ],
  controllers: [AssignOrderController],
  providers: [AssignOrderService, AssignOrderRepository],
})
export class AssignOrderModule {}
