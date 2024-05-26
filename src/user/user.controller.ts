import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from './consts/enums';
import { Role } from '../decorators/role.decorator';

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

  @Delete('/remove')
  @ApiOperation({ summary: 'Удаление пользователя' })
  removeUser(@Body() dto: CreateUserDto) {
    return this.userService.removeUser(dto);
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
  updateUser(@Body() dto: CreateUserDto) {
    return this.userService.updateUser(dto);
  }
}
