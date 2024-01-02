import { Module } from '@nestjs/common';
import { DinnerTableService } from './dinner-table.service';
import { DinnerTableController } from './dinner-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DinnerTable } from './entities/dinner-table.entity';
import { DinnerTableRepository } from './dinner-table.repo';

@Module({
  imports: [TypeOrmModule.forFeature([DinnerTable])],
  controllers: [DinnerTableController],
  providers: [DinnerTableService, DinnerTableRepository],
  exports: [DinnerTableService],
})
export class DinnerTableModule {}
