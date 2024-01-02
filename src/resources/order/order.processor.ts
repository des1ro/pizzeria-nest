import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { DiscountService } from '../discount/discount.service';
import { Discount } from '../discount/entities/discount.entity';
import { IngredientStockService } from '../ingredient/_ingredient-stock/ingredient-stock.service';
import { ProductIngredientQuantity } from '../product/_product.ingredients/entity/product.ingredient.quantity.entity';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { Reservation } from '../reservation/entity/reservation.entity';
import { ReservationService } from '../reservation/reservation.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/orderProduct.entity';

@Injectable()
export class OrderProcessor {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly ingredientStockService: IngredientStockService,
    private readonly discountService: DiscountService,
    private readonly productService: ProductService,
  ) {}
  async processCreate(
    createOrderDto: CreateOrderDto,
    transactionalEntityManager: EntityManager,
  ): Promise<Order> {
    let reservation: Reservation | null = null;
    let discount: Discount | null = null;

    if (createOrderDto.reservation) {
      reservation = await this.reservationService.createTransactional(
        createOrderDto.reservation,
        transactionalEntityManager,
      );
    }
    const products = await this.productService.findMany(
      createOrderDto.productsId,
    );

    const orderProducts = products.map(
      (product) => new OrderProduct({ product: product }),
    );

    const productIngredientQuantity =
      await this.getProductIngredients(products);

    await this.ingredientStockService.updateManyTransaction(
      productIngredientQuantity,
      transactionalEntityManager,
    );
    let price = products.reduce((total, product) => total + product.price, 0);
    if (createOrderDto.discountCode) {
      discount = await this.discountService.findAndUseDiscountTransactional(
        createOrderDto.discountCode,
        transactionalEntityManager,
      );
      price = price * (1 - discount.value / 100);
    }

    const order = new Order({
      reservation: reservation,
      discount: discount,
      products: orderProducts,
      price: price,
    });

    return order;
  }

  async processUpdate(
    order: Order,
    updateOrderDto: UpdateOrderDto,
    transactionalEntityManager: EntityManager,
  ): Promise<Order> {
    const products = await this.productService.findMany(
      updateOrderDto.productsId,
    );
    let newProductsPrice = products.reduce(
      (total, product) => total + product.price,
      0,
    );
    const orderProducts = products.map(
      (product) => new OrderProduct({ product: product }),
    );
    if (order.discount) {
      newProductsPrice = newProductsPrice * (1 - order.discount.value / 100);
    }
    order.price = order.price + newProductsPrice;

    order.products.push(...orderProducts);

    const productIngredientQuantityToUpdate =
      await this.getProductIngredients(products);
    await this.ingredientStockService.updateManyTransaction(
      productIngredientQuantityToUpdate,
      transactionalEntityManager,
    );
    return order;
  }
  private async getProductIngredients(
    products: Product[],
  ): Promise<ProductIngredientQuantity[]> {
    const productIngredients = await Promise.all(
      products.flatMap(async (product) => {
        return await product.ingredientsQuantities;
      }),
    );
    return [].concat(...productIngredients);
  }
}
