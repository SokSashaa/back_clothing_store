import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { localOptions } from './storageFilesCategories';
import { Roles } from '../user/consts/enums';
import { Role } from '../decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Получение всех категорий' })
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Delete()
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Удаление категории' })
  removeCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.remove(dto);
  }

  @Post()
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('category_img_name', localOptions))
  @ApiOperation({ summary: 'Создание категории' })
  @ApiConsumes('multipart/form-data')
  create(
    @Body() dto: CreateCategoryDto,
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return this.categoryService.create(dto, file);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Поиск по айди категории' })
  @ApiParam({ name: 'id', type: 'string' })
  getCategoryByID(@Param('id') id: string) {
    return this.categoryService.getCategoryByID(id);
  }

  @Put()
  @ApiOperation({ summary: 'Обновление категории' })
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('category_img_name', localOptions))
  @ApiConsumes('multipart/form-data')
  updateCategory(
    @Body() dto: CreateCategoryDto,
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return this.categoryService.updateCategory(dto, file);
  }

  @Get('/search/:name')
  @ApiOperation({ summary: 'Поиск по части наименования' })
  @ApiParam({ name: 'name', type: 'string' })
  searchCategoryByPartName(@Param('name') name: string) {
    return this.categoryService.searchCategoryByPartName(name);
  }
}
