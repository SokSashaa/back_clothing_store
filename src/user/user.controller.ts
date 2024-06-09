import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from './consts/enums';
import { Role } from '../decorators/role.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@ApiTags('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Создание пользователя' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete('/remove/:user_id')
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiParam({ name: 'user_id', type: 'string' })
  removeUser(@Param('user_id') user_id: string) {
    return this.userService.removeUser(user_id);
  }

  @Get('/getAllUsers')
  @Role(Roles.admin)
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'получение всех пользователей' })
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put('/update')
  @ApiOperation({ summary: 'обновление пользователя' })
  updateUser(@Body() dto: UpdateUserDto) {
    return this.userService.updateUser(dto);
  }

  @Get('/getUserEmail/:email')
  @ApiOperation({ summary: 'Получение пользователя по email' })
  @ApiParam({ name: 'email', type: 'string' })
  findUserByEmail(@Param('email') email: string) {
    return this.userService.findUserByEmail(email);
  }
}
