import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';

export class CreateFavouriteDto {
  favourite_id: string;
  user: User;
  @ApiProperty({ default: 99, type: 'number' })
  product: Product;
}
