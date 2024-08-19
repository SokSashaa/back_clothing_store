import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserMe } from '../decorators/user_me.decorator';
import { User } from '../user/entities/user.entity';

@Controller('cart')
@ApiBearerAuth()
@ApiTags('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Создание части корзины пользователя' })
  create(@Body() createCartDto: CreateCartDto, @UserMe() user: User) {
    return this.cartService.create(createCartDto, user);
  }

  @Get('/user')
  @ApiOperation({ summary: 'Получение корзины по пользователю' })
  findAllProductsForUser(@UserMe() user: User) {
    return this.cartService.findAllProductsForUser(user);
  }
  @Put()
  @ApiOperation({ summary: 'Обновление строки корзины' })
  update(@UserMe() user: User, @Body() data: CreateCartDto) {
    return this.cartService.update(user, data);
  }

  @Delete()
  @ApiOperation({ summary: 'Удаление строки корзины' })
  remove(@UserMe() user: User, @Body() data: CreateCartDto) {
    return this.cartService.remove(user, data);
  }
}
