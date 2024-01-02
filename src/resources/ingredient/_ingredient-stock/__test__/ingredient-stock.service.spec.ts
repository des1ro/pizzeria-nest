import { Test, TestingModule } from '@nestjs/testing';
import { IngredientStockService } from '../ingredient-stock.service';

describe('IngredientStockService', () => {
  let service: IngredientStockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientStockService],
    }).compile();

    service = module.get<IngredientStockService>(IngredientStockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
