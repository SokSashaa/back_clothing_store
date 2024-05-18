import {Roles} from "../consts/enums";
import {IsDate, IsEmail, IsEnum, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @IsString()
    @ApiProperty({
        default:'1'
    })
    id:string;

    @ApiProperty({
        default:'Alexsandr'
    })
    @IsString()
    firstname: string;

    @ApiProperty({
        default:'Sokolov'
    })
    @IsString()
    lastname: string;

    @ApiProperty({
        default:'test@mail.ru'
    })
    @IsEmail()
    email: string;

    // @ApiProperty({
    //     default:'soksasha'
    // })
    // @IsString()
    // login: string;

    @ApiProperty({
        default:'Qwerty123!'
    })
    @IsString()
    password: string;

    @ApiProperty({
        default:Roles.admin
    })
    @IsEnum(Roles)
    role: Roles;

    @ApiProperty({
        default:'12.12.2010'
    })
    @IsDate()
    date_reg: Date;

    @ApiProperty({
        default:'01.01.1999'
    })
    @IsDate()
    date_birthday: Date;

    
}
