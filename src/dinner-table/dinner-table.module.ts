import { Module } from '@nestjs/common';
import { DinnerTableService } from './dinner-table.service';
import { DinnerTableController } from './dinner-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DinnerTable } from './entities/dinner-table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DinnerTable])],
  controllers: [DinnerTableController],
  providers: [DinnerTableService],
})
export class DinnerTableModule {}
