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
import { DinnerTable } from './entities/dinner-table.entity';
import { RemoveResponse } from '../../shared/interfaces/removeResponse.interface';

@Controller('dinner-table')
export class DinnerTableController {
  constructor(private readonly dinnerTableService: DinnerTableService) {}

  @Post()
  async create(
    @Body() createDinnerTableDto: CreateDinnerTableDto,
  ): Promise<DinnerTable> {
    return await this.dinnerTableService.create(createDinnerTableDto);
  }

  @Get()
  async findAll(): Promise<DinnerTable[]> {
    return await this.dinnerTableService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DinnerTable> {
    return await this.dinnerTableService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDinnerTableDto: UpdateDinnerTableDto,
  ): Promise<DinnerTable> {
    return await this.dinnerTableService.update(id, updateDinnerTableDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<RemoveResponse> {
    return await this.dinnerTableService.remove(id);
  }
}
