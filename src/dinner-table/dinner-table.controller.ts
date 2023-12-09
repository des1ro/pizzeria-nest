import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DinnerTableService } from './dinner-table.service';
import { CreateDinnerTableDto } from './dto/create-dinner-table.dto';
import { UpdateDinnerTableDto } from './dto/update-dinner-table.dto';

@Controller('dinnerTable')
export class DinnerTableController {
  constructor(private readonly dinnerTableService: DinnerTableService) {}

  @Post()
  async create(@Body() createDinnerTableDto: CreateDinnerTableDto) {
    return await this.dinnerTableService.create(createDinnerTableDto);
  }

  @Get()
  async findAll() {
    return await this.dinnerTableService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dinnerTableService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDinnerTableDto: UpdateDinnerTableDto,
  ) {
    return await this.dinnerTableService.update(id, updateDinnerTableDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.dinnerTableService.remove(id);
  }
}
