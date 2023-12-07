import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createOrderDto: CreateOrderDto): Promise<void> {
    console.log(createOrderDto);

    // await this.entityManager.transaction(async (transactionalEntityManager) => {
    //   const order = new Order(createOrderDto);

    //   const updateIngredientsPromises = await this.updateIngredients(
    //     order.products,
    //     transactionalEntityManager,
    //   );
    //   await Promise.all(updateIngredientsPromises);
    //   await transactionalEntityManager.save(Order, order);
    // });
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    return await this.orderRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    console.log(updateOrderDto);

    // const order = await this.orderRepository.findOneByOrFail({ id });
    // order.products.push(...updateOrderDto.products);
    // this.entityManager.transaction(async (transactionalEntityManager) => {
    //   const updateIngredientsPromises = await this.updateIngredients(
    //     updateOrderDto.products,
    //     transactionalEntityManager,
    //   );
    //   await Promise.all(updateIngredientsPromises);
    //   await transactionalEntityManager.save(Order, order);
    // });
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
  // private async updateIngredients(
  //   products: Product[],
  //   transactionalEntityManager: EntityManager,
  // ): Promise<Promise<void>[]> {
  //   return products.flatMap((product) =>
  //     product.ingredients.map(async (ingredient) => {
  //       const ingredientToUpdate =
  //         await transactionalEntityManager.findOneOrFail(Ingredient, {
  //           where: {
  //             id: ingredient.id,
  //           },
  //         });

  //       if (ingredientToUpdate.quantity >= ingredient.quantity) {
  //         ingredientToUpdate.quantity -= ingredient.quantity;
  //         await transactionalEntityManager.save(Ingredient, ingredientToUpdate);
  //       } else {
  //         throw new Error(
  //           `Insufficient ${ingredientToUpdate.name} component in stock.`,
  //         );
  //       }
  //     }),
  //   );
  // }
  async getPrice(id: string): Promise<number> {
    const order = await this.orderRepository.findOneByOrFail({ id });
    return order.price;
  }
}
