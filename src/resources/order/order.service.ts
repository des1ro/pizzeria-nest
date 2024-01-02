import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { RemoveResponse } from '../../shared/interfaces/removeResponse.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repo';
import { OrderProcessor } from './order.processor';

@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly entityManager: EntityManager,
    private readonly orderProccessor: OrderProcessor,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.entityManager.transaction(async (transaction) => {
      const order = await this.orderProccessor.processCreate(
        createOrderDto,
        transaction,
      );
      return transaction.save(Order, order);
    });
    return this.findOne(order.id);
  }
  async findAll(): Promise<Order[]> {
    const orders = await this.repository.findAllOrders();
    if (orders.length === 0) {
      throw new NotFoundException('Not found any order');
    }
    return orders;
  }
  async findOneWithoutAssignedEmployee(): Promise<Order> {
    return await this.repository.findOneWithoutAssignedEmployee();
  }
  async findOne(id: string): Promise<Order> {
    const order = await this.repository.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    const updatedOrder = await this.entityManager.transaction(
      async (transaction) => {
        const orderToUpdate = await this.orderProccessor.processUpdate(
          order,
          updateOrderDto,
          transaction,
        );

        return transaction.save(Order, orderToUpdate);
      },
    );
    return this.findOne(updatedOrder.id);
  }

  async remove(id: string): Promise<RemoveResponse> {
    const order = await this.findOne(id);
    await this.repository.remove(order);
    return { success: true, message: `Order id: ${id} removed successfuly` };
  }
}
