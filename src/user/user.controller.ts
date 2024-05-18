import {Body, Controller, Delete, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('/create')
    @ApiOperation({summary: 'Создание пользователя'})
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Delete('/remove')
    @ApiOperation({summary: 'Удаление пользователя'})
    removeUser(@Body() dto: CreateUserDto) {
        return this.userService.removeUser(dto)
    }
}
