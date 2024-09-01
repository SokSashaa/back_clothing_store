import { User } from '../../user/entities/user.entity';
import { statusOrderEnum } from '../enums';
import { Product } from '../../product/entities/product.entity';
import { Company } from '../../company/entities/company.entity';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    default: 1,
    required: false,
  })
  id_order: number;

  @ApiProperty({
    default: [
      {
        product_id: 96,
      },
      {
        product_id: 97,
      },
    ],
  })
  products: Product[];

  @IsEnum(statusOrderEnum)
  @ApiProperty({
    default: 0,
    required: false,
  })
  status: statusOrderEnum;

  @ApiProperty({
    default: 100,
  })
  sum_order: number;

  @ApiProperty({
    default: 10,
  })
  client: User;

  @ApiProperty({
    default: [47],
    required: false,
  })
  sellers: Company[];
}
