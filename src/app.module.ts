import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ReservationModule } from './reservation/reservation.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './employees/employees.module';
import { ProductModule } from './product/product.module';
import { IngredientModule } from './ingredient/ingredient.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    OrderModule,
    ReservationModule,
    DatabaseModule,
    EmployeesModule,
    ProductModule,
    IngredientModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
