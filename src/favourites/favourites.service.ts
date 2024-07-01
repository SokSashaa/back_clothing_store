import { Injectable } from '@nestjs/common';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favourite } from './entities/favourite.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { ProductService } from '../product/product.service';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(Favourite) private repository: Repository<Favourite>,
    private productService: ProductService,
  ) {}

  async create(user: User, data: CreateFavouriteDto) {
    const product = await this.productService.getProductByID(
      data.product.product_id,
    );
    if (product) {
      return this.repository.save({
        product: product,
        user: user,
      });
    }
  }

  async remove(user: User, data: CreateFavouriteDto) {
    return this.repository.delete({
      user: user,
      product: data.product,
    });
  }

  async getAllFavouritesByIdUser(user: User) {
    return this.repository
      .createQueryBuilder('fav')
      .where('fav.user=:user', { user: user.id })
      .innerJoin('fav.user', 'user')
      .innerJoinAndSelect('fav.product', 'product')
      .getMany();
  }
}
