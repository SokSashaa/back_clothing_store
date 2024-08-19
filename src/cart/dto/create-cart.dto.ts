import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

export class CreateCartDto {
  @ApiProperty({ default: '10' })
  id_user: User;

  @ApiProperty({ default: '96' })
  id_product: Product;

  @ApiProperty({ default: '1', minimum: 0 })
  count_product: number;
}
