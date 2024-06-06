import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Category } from '../../category/entities/category.entity';
import { Company } from '../../company/entities/company.entity';

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
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    required: false,
  })
  product_image: string;

  @ApiProperty({
    default: 1234,
  })
  product_price: number;

  @ApiProperty({
    default: 0.0,
    maximum: 1,
    minimum: 0,
    required: false,
  })
  product_discount: number;

  @ApiProperty({
    default: '31',
  })
  category_id: Category;

  @ApiProperty({ default: '28' })
  company_id: Company;
}
