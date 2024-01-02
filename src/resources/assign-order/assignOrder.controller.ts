import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AssignOrderService } from './assignOrder.service';
import { CreateAssignOrderDto } from './dto/create-assignOrder.dto';
import { UpdateAssignOrderDto } from './dto/update-assignOrder.dto';
import { AssignOrder } from './entities/assignedOrder.entity';
import { RemoveResponse } from '../../shared/interfaces/removeResponse.interface';

@Controller('assign-order')
export class AssignOrderController {
  constructor(private readonly assignOrderService: AssignOrderService) {}

  @Post()
  async create(
    @Body() createAssignOrderDto: CreateAssignOrderDto,
  ): Promise<AssignOrder> {
    return await this.assignOrderService.assignOrders(createAssignOrderDto);
  }

  @Get()
  async findAll(): Promise<AssignOrder[]> {
    return await this.assignOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AssignOrder> {
    return this.assignOrderService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssignOrderDto: UpdateAssignOrderDto,
  ): Promise<AssignOrder> {
    return this.assignOrderService.update(id, updateAssignOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<RemoveResponse> {
    return this.assignOrderService.remove(id);
  }
}
