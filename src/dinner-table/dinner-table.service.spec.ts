import { Test, TestingModule } from '@nestjs/testing';
import { DinnerTableService } from './dinner-table.service';

describe('DinnerTableService', () => {
  let service: DinnerTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DinnerTableService],
    }).compile();

    service = module.get<DinnerTableService>(DinnerTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
