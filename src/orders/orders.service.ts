import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { statusOrderEnum } from './enums';
import { OrderItem } from './entities/orderItem.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private repository: Repository<Order>,
    @InjectRepository(Product) private product_repository: Repository<Product>,
    @InjectRepository(OrderItem)
    private orderItem_repository: Repository<OrderItem>,
  ) {}

  private getObjectWithOrderItems = async (orders: Order[]) => {
    const result = [];
    for (let i = 0; i < orders.length; i++) {
      const orderItems = await this.orderItem_repository
        .createQueryBuilder('oi')
        .where('oi.order=:id', { id: orders[i].id_order })
        .innerJoinAndSelect('oi.product', 'p')
        .getMany();

      result[i] = { ...orders[i], order_item: orderItems };
    }
    return result;
  };

  async create(user: User, data: CreateOrderDto) {
    const queryRunner = this.repository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction(); // запуск транзакции

    const order = await queryRunner.manager.insert(Order, {
      ...data,
      client: user,
      status: statusOrderEnum.waiting,
      date: new Date(),
    }); //вставка заказа
    const { id_order } = order.identifiers[0]; //получение id заказа

    for (let i = 0; i < data.products.length; i++) {
      //проверяем все продукты
      console.log('test');
      const product = await this.product_repository
        .createQueryBuilder('prod')
        .where(' prod.product_id=:id ', {
          id: data.products[i].product_id.product_id,
        })
        .innerJoinAndSelect('prod.company_id', 'c', 'c.id=prod.company_id')
        .getOne();

      if (!product) {
        await queryRunner.rollbackTransaction();
        throw new HttpException(
          `Продукт с id ${data.products[i].product_id} не найден`,
          HttpStatus.NOT_FOUND,
        );
      }

      await queryRunner.manager.insert(OrderItem, {
        id_order: id_order,
        product: product,
        product_count: data.products[i].count,
        product_discount: product.product_discount,
        product_price: product.product_price,
      });
    }

    await queryRunner.commitTransaction();
    return HttpStatus.OK;
  }

  async getOrderByID(id: number) {
    const order = await this.repository.findOne({
      where: {
        id_order: id,
      },
    });

    const result = await this.getObjectWithOrderItems([order]);
    return {
      ...order,
      order_item: result,
    };
  }

  async getOrdersByUserID(id_user: number) {
    const orders = await this.repository
      .createQueryBuilder('o')
      .where('o.client_id=:id', { id: id_user })
      .getMany();

    const result = await this.getObjectWithOrderItems(orders);
    return result;
  }

  async getOrdersByUser(user: User) {
    const orders = await this.repository.findBy({ client: user });
    const result = await this.getObjectWithOrderItems(orders);
    return result;
  }

  update(data: UpdateOrderDto) {
    return this.repository.update(
      {
        id_order: data.id_order,
      },
      { ...data },
    );
  }

  async remove(id: number) {
    const delete_items = await this.orderItem_repository.delete({
      id_order: id,
    });

    if (delete_items.affected > 0) {
      return this.repository.delete({ id_order: id });
    } else throw new HttpException('Заказ не найден', HttpStatus.NOT_FOUND);
  }

  async getOrdersMyCompany(user: User) {
    return this.repository
      .createQueryBuilder('or')
      .innerJoinAndSelect('or.order_item', 'oi')
      .innerJoinAndSelect('oi.product', 'p')
      .innerJoin('p.company_id', 'c')
      .innerJoin('c.user_id', 'user')
      .where('user.id=:id', { id: user.id })
      .getMany();
  }
}
