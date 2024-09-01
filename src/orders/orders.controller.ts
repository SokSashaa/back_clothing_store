import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserMe } from '../decorators/user_me.decorator';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('orders')
@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/receive')
  @ApiOperation({ summary: 'Получение полученных заказов по юзеру' })
  getReceiveOrdersByUser(@UserMe() user: User) {
    return this.ordersService.getReceiveOrdersByUser(user);
  }

  @Post()
  @ApiOperation({ summary: 'Создание покупки' })
  create(@UserMe() user: User, @Body() data: CreateOrderDto) {
    return this.ordersService.create(user, data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение заказа по ID' })
  getOrderByID(@Param('id') id: number) {
    return this.ordersService.getOrderByID(id);
  }

  @Get('/user/:id_user')
  @ApiOperation({ summary: 'Получение заказов по id юзера' })
  getOrderByUserID(@Param('id_user') id_user: number) {
    return this.ordersService.getOrdersByUserID(id_user);
  }

  @Get()
  @ApiOperation({ summary: 'Получение заказов по юзеру' })
  getOrdersByUser(@UserMe() user: User) {
    return this.ordersService.getOrdersByUser(user);
  }

  @Put()
  @ApiOperation({ summary: 'Обновление заказа' })
  update(@Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление заказа по id' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
