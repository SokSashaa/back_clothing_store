import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { UserMe } from '../decorators/user_me.decorator';
import { CreateFavouriteDto } from './dto/create-favourite.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('favourites')
@ApiTags('favourites')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post()
  @ApiOperation({ summary: 'Создание избранного' })
  createFavourite(@UserMe() user, @Body() data: CreateFavouriteDto) {
    return this.favouritesService.create(user, data);
  }

  @Delete()
  @ApiOperation({ summary: 'Удаление избранного' })
  removeFavourite(@UserMe() user, @Body() data: CreateFavouriteDto) {
    return this.favouritesService.remove(user, data);
  }

  @Get()
  @ApiOperation({
    summary: 'Получение всех избранных товаров по айди пользователя',
  })
  getAllFavouritesByIdUser(@UserMe() user) {
    return this.favouritesService.getAllFavouritesByIdUser(user);
  }
}
