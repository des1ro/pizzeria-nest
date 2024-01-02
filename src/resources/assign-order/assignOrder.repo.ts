import { Injectable } from '@nestjs/common';
import { AssignOrder } from './entities/assignedOrder.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AssignOrderRepository {
  constructor(
    @InjectRepository(AssignOrder)
    private readonly repository: Repository<AssignOrder>,
  ) {}
  async save(assignOrder: AssignOrder) {
    return this.repository.save(assignOrder);
  }
  async findOne(id: string) {
    return this.repository.findOne({
      where: { id: id },
      relations: { employee: true, order: true },
    });
  }
  async findAll() {
    return this.repository.find({});
  }
  async remove(assignOrder: AssignOrder) {
    return this.repository.remove(assignOrder);
  }
}
