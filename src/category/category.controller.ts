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
  ApiBody,
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
  @UseInterceptors(FileInterceptor('file', localOptions))
  @ApiOperation({ summary: 'Создание категории' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        category_name: {
          type: 'string',
          default: 'СИЗ',
        },
      },
    },
  })
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
  @UseInterceptors(FileInterceptor('file', localOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        category_id: {
          type: 'string',
          default: '31',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
        category_name: {
          type: 'string',
          default: 'СИЗ',
        },
      },
    },
  })
  updateCategory(
    @Body() dto: CreateCategoryDto,
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return this.categoryService.updateCategory(dto, file);
  }
}
