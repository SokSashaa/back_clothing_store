import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ default: '1' })
  @IsString()
  category_id: string;

  @ApiProperty({ default: 'СИЗ' })
  @IsString()
  category_name: string;

  @ApiProperty({ default: 'siz.png' })
  @IsString()
  category_img_name: string;
}
