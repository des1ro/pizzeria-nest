import { Test, TestingModule } from '@nestjs/testing';
import { IngredientStockController } from '../ingredient-stock.controller';
import { IngredientStockService } from '../ingredient-stock.service';

describe('IngredientStockController', () => {
  let controller: IngredientStockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientStockController],
      providers: [IngredientStockService],
    }).compile();

    controller = module.get<IngredientStockController>(
      IngredientStockController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
