import { User } from '../../user/entities/user.entity';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateCompanyDto {
  @IsString()
  @Type(() => String)
  @ApiProperty({ default: '1', required: false })
  id: string;

  @IsString()
  @ApiProperty({ default: 'ТестИмя' })
  name: string;

  @IsString()
  @ApiProperty({ default: '12345678' })
  inn: string;

  @IsString()
  @ApiProperty({ default: '212121' })
  ogrn: string;

  @IsString()
  @ApiProperty({ default: 'г.кострома тратата' })
  address: string;

  @ApiProperty({ default: '9' })
  user_id: User;
}
