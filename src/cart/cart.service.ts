import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private repository: Repository<Cart>) {}

  async create(data: CreateCartDto, user: User) {
    return this.repository
      .save({
        id_user: user,
        id_product: data.id_product,
        count_product: data.count_product,
      })
      .catch(() => {
        throw new HttpException('Ошибка при создании', HttpStatus.BAD_REQUEST);
      });
  }

  findAllProductsForUser(user: User) {
    return this.repository
      .createQueryBuilder('c')
      .select('c.count_product')
      .where('c.id_user=:id', { id: user.id })
      .innerJoinAndSelect('c.id_product', 'product_id')
      .getMany();
  }

  async update(user: User, data: UpdateCartDto) {
    const result = await this.repository.update(
      {
        id_user: user,
        id_product: data.id_product,
      },
      { count_product: data.count_product },
    );
    if (result.affected > 0) return result;
    else throw new HttpException('Не найден продукт', HttpStatus.NOT_FOUND);
  }

  async remove(user: User, data: CreateCartDto) {
    const result = await this.repository.delete({
      id_user: user,
      id_product: data.id_product,
    });
    if (result.affected > 0) return result;
    else
      throw new HttpException(
        'Не удалось удалить продукт у пол-я',
        HttpStatus.BAD_REQUEST,
      );
  }
}
