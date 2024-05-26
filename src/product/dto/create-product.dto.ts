import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Category } from '../../category/entities/category.entity';

export class CreateProductDto {
  @ApiProperty({
    default: '1',
    required: false,
  })
  @IsString()
  product_id: string;
  @ApiProperty({
    default: '43A4RQ',
  })
  @IsString()
  article: string;

  @ApiProperty({
    default: 'Молоко',
  })
  @IsString()
  product_name: string;

  @ApiProperty({
    default: 'Молоко 4л',
  })
  @IsString()
  product_description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsString()
  product_image: string;

  @ApiProperty({
    default: 1234,
  })
  @IsNumber()
  product_price: number;

  @ApiProperty({
    default: 0,
  })
  @IsNumber()
  product_discount: number;

  @ApiProperty({
    default: '31',
  })
  category_id: Category;
}
