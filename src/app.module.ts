import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DinnerTableModule } from './dinner-table/dinner-table.module';
import { DiscountModule } from './discount/discount.module';
import { EmployeesModule } from './employees/employees.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ReservationModule,
    DatabaseModule,
    EmployeesModule,
    ProductModule,
    OrderModule,
    DiscountModule,
    DinnerTableModule,
    IngredientModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
