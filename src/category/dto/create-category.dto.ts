import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ default: '1', required: false })
  // @IsString()
  category_id: string;

  @ApiProperty({ default: 'СИЗ' })
  @IsString()
  category_name: string;

  @ApiProperty({ default: 'siz.png', required: false })
  @IsString()
  @IsOptional()
  category_img_name: string;
}
