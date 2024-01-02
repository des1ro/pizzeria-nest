import { Injectable, NotFoundException } from '@nestjs/common';
import { AssignOrderRepository } from './assignOrder.repo';
import { OrderService } from '../order/order.service';
import { EmployeesService } from '../employees/employees.service';
import { AssignOrder } from './entities/assignedOrder.entity';
import { CreateAssignOrderDto } from './dto/create-assignOrder.dto';
import { UpdateAssignOrderDto } from './dto/update-assignOrder.dto';
import { RemoveResponse } from '../../shared/interfaces/removeResponse.interface';

@Injectable()
export class AssignOrderService {
  constructor(
    private readonly repository: AssignOrderRepository,
    private readonly orderService: OrderService,
    private readonly employeeService: EmployeesService,
  ) {}
  async assignOrders(
    createAssignOrderDto: CreateAssignOrderDto,
  ): Promise<AssignOrder> {
    const employee = await this.employeeService.findOne(
      createAssignOrderDto.employeeId,
    );
    const order = await this.orderService.findOneWithoutAssignedEmployee();
    if (!order) {
      throw new NotFoundException(`There isn't any pending order`);
    }
    const assignOrder = new AssignOrder({
      employee: employee,
      order: order,
    });
    return await this.repository.save(assignOrder);
  }
  async update(
    id: string,
    updateAssignOrderDto: UpdateAssignOrderDto,
  ): Promise<AssignOrder> {
    const assignOrder = await this.findOne(id);
    assignOrder.status = updateAssignOrderDto.status;
    return await this.repository.save(assignOrder);
  }
  async findAll(): Promise<AssignOrder[]> {
    return this.repository.findAll();
  }
  async findOne(id: string): Promise<AssignOrder> {
    const assignOrder = await this.repository.findOne(id);
    if (!assignOrder) {
      throw new NotFoundException(`Assigned Order with id: ${id} not found`);
    }
    return assignOrder;
  }

  async remove(id: string): Promise<RemoveResponse> {
    const assignOrder = await this.repository.findOne(id);
    await this.repository.remove(assignOrder);
    return {
      success: true,
      message: `Assigned Order with id ${id} removed successfuly`,
    };
  }
}
