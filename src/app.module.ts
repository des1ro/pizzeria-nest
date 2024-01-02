import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { DinnerTableModule } from './resources/dinner-table/dinner-table.module';
import { DiscountModule } from './resources/discount/discount.module';
import { EmployeesModule } from './resources/employees/employees.module';
import { IngredientModule } from './resources/ingredient/ingredient.module';
import { OrderModule } from './resources/order/order.module';
import { ProductModule } from './resources/product/product.module';
import { ReservationModule } from './resources/reservation/reservation.module';
import { AssignOrderModule } from './resources/assign-order/assignOrder.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DinnerTableModule,
    DiscountModule,
    EmployeesModule,
    IngredientModule,
    OrderModule,
    ProductModule,
    ReservationModule,
    AssignOrderModule,
    AuthModule,
    UserModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
