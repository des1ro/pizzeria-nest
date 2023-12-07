import { Test, TestingModule } from '@nestjs/testing';
import { DinnerTableController } from './dinner-table.controller';
import { DinnerTableService } from './dinner-table.service';

describe('DinnerTableController', () => {
  let controller: DinnerTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DinnerTableController],
      providers: [DinnerTableService],
    }).compile();

    controller = module.get<DinnerTableController>(DinnerTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
