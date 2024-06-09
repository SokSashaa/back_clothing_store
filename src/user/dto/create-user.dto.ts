import { Roles } from '../consts/enums';
import { IsDate, IsEmail, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateUserDto {
  // @IsString()
  @ApiProperty({
    default: '1',
    required: false,
  })
  id: string;

  @ApiProperty({
    default: 'Alexsandr',
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    default: 'Sokolov',
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    default: 'test@mail.ru',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 'Qwerty123!',
    required: false,
  })
  @IsString()
  password: string;

  @ApiProperty({
    default: Roles.admin,
  })
  @IsEnum(Roles)
  role: Roles;

  @ApiProperty({
    default: '12.12.2010',
  })
  @IsDate()
  @Type(() => Date)
  date_reg: Date;

  @ApiProperty({
    default: '01.01.1999',
  })
  @IsDate()
  @Type(() => Date)
  date_birthday: Date;
}
