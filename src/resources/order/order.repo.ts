import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOneOptions, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}
  async save(order: Order) {
    this.orderRepository.save(order);
  }
  async saveTransactional(order: Order, transaction: EntityManager) {
    return transaction.save(Order, order);
  }
  async findAllOrders() {
    const conditions = this.getFindConditions();

    return await this.orderRepository.find({
      relations: conditions.relations,
      select: conditions.select,
    });
  }

  async findOne(id: string) {
    const conditions = this.getFindConditions();
    return await this.orderRepository.findOne({
      where: { id: id },
      relations: conditions.relations,
      select: conditions.select,
    });
  }
  async findOneWithoutAssignedEmployee() {
    return await this.orderRepository.findOne({ where: { assignOrder: null } });
  }
  async remove(order: Order) {
    return await this.orderRepository.remove(order);
  }
  private getFindConditions(): FindOneOptions<Order> {
    return {
      relations: {
        reservation: true,
        products: true,
        discount: true,
      },
      select: {
        discount: { name: true, value: true },
      },
    };
  }
}
