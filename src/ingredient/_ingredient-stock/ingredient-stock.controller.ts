import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IngredientStockService } from './ingredient-stock.service';
import { CreateIngredientStockDto } from './dto/create-ingredient-stock.dto';
import { UpdateIngredientStockDto } from './dto/update-ingredient-stock.dto';

@Controller('ingredient-stock')
export class IngredientStockController {
  constructor(
    private readonly ingredientStockService: IngredientStockService,
  ) {}

  @Post()
  create(@Body() createIngredientStockDto: CreateIngredientStockDto) {
    return this.ingredientStockService.create(createIngredientStockDto);
  }

  @Get()
  findAll() {
    return this.ingredientStockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientStockService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientStockDto: UpdateIngredientStockDto,
  ) {
    return this.ingredientStockService.update(id, updateIngredientStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientStockService.remove(id);
  }
}
