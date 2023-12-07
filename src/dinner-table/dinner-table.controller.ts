import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DinnerTableService } from './dinner-table.service';
import { CreateDinnerTableDto } from './dto/create-dinner-table.dto';
import { UpdateDinnerTableDto } from './dto/update-dinner-table.dto';

@Controller('dinnerTable')
export class DinnerTableController {
  constructor(private readonly dinnerTableService: DinnerTableService) {}

  @Post()
  create(@Body() createDinnerTableDto: CreateDinnerTableDto) {
    return this.dinnerTableService.create(createDinnerTableDto);
  }

  @Get()
  findAll() {
    return this.dinnerTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dinnerTableService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDinnerTableDto: UpdateDinnerTableDto,
  ) {
    return this.dinnerTableService.update(id, updateDinnerTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dinnerTableService.remove(id);
  }
}
