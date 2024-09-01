import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { statusOrderEnum } from './enums';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private repository: Repository<Order>,
    @InjectRepository(Product) private product_repository: Repository<Product>,
  ) {}

  private getArrayProducts = async (products) => {
    const arrProducts: Product[] = [];

    for (let i = 0; i < products.length; i++) {
      const product = await this.product_repository
        .createQueryBuilder('p')
        .where('p.product_id=:id', { id: products[i] })
        .innerJoinAndSelect('p.company_id', 'c')
        .innerJoinAndSelect('p.category', 'cat')
        .getOne();

      arrProducts.push({
        ...product,
        company_id: product.company_id,
        category: product.category,
      });
    }
    return arrProducts;
  };

  async create(user: User, data: CreateOrderDto) {
    const products = [];
    for (let i = 0; i < data.products.length; i++) {
      const product = await this.product_repository
        .createQueryBuilder('prod')
        .where(' prod.product_id=:id ', {
          id: data.products[i].product_id,
        })
        .innerJoinAndSelect('prod.company', 'c', 'c.id=prod.company_id')
        .getOne();

      if (!product)
        throw new HttpException(
          `Продукт с id ${data.products[i].product_id} не найден`,
          HttpStatus.NOT_FOUND,
        );
      products.push(product.product_id);
    }

    return this.repository.insert({
      ...data,
      client: user,
      status: statusOrderEnum.waiting,
      products: products,
    });
  }

  async getOrderByID(id: number) {
    const order = await this.repository.findOne({
      where: {
        id_order: id,
      },
    });

    const products = await this.getArrayProducts(order.products);
    return {
      ...order,
      products: products,
    };
  }

  async getOrdersByUserID(id_user: number) {
    const orders = await this.repository
      .createQueryBuilder('o')
      .where('o.client_id=:id', { id: id_user })
      .getMany();

    for (let i = 0; i < orders.length; i++) {
      const products = await this.getArrayProducts(orders[i].products);
      orders[i] = { ...orders[i], products: products };
    }

    return orders;
  }

  async getOrdersByUser(user: User) {
    const orders = await this.repository.findBy({ client: user });
    for (let i = 0; i < orders.length; i++) {
      const products = await this.getArrayProducts(orders[i].products);
      orders[i] = { ...orders[i], products: products };
    }
    return orders;
  }

  async getReceiveOrdersByUser(user: User) {
    const orders = await this.repository.findBy({
      client: user,
      status: statusOrderEnum.receive,
    });

    for (let i = 0; i < orders.length; i++) {
      const products = await this.getArrayProducts(orders[i].products);
      orders[i] = { ...orders[i], products: products };
    }

    return orders;
  }

  update(data: UpdateOrderDto) {
    return this.repository.update(
      {
        id_order: data.id_order,
      },
      { ...data },
    );
  }

  remove(id: number) {
    return this.repository.delete({ id_order: id });
  }
}
