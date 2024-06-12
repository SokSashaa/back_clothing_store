import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { localOptions } from './storageFilesProducts';
import { Role } from '../decorators/role.decorator';
import { Roles } from '../user/consts/enums';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  @ApiBearerAuth()
  @Role(Roles.producer, Roles.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'product_image', maxCount: 5 }],
      localOptions,
    ),
  )
  @ApiOperation({ summary: 'Создание продукта' })
  @ApiConsumes('multipart/form-data')
  create(
    @Body() dto: CreateProductDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    return this.productService.createProduct(dto, files);
  }

  @Delete('/delete')
  @ApiBearerAuth()
  @Role(Roles.producer, Roles.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Удаление продукта' })
  removeProduct(@Body() dto: CreateProductDto) {
    return this.productService.removeProduct(dto);
  }

  @ApiBearerAuth()
  @Role(Roles.producer, Roles.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/update')
  @ApiOperation({ summary: 'Обновление продукта' })
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'product_image', maxCount: 5 }],
      localOptions,
    ),
  )
  @ApiConsumes('multipart/form-data')
  updateProduct(
    @Body() dto: CreateProductDto,
    @UploadedFiles() file?: Express.Multer.File[],
  ) {
    return this.productService.updateProduct(dto, file);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Поиск по айди продукта' })
  @ApiParam({ name: 'id', type: 'string' })
  getProductById(@Param('id') id: string) {
    return this.productService.getProductByID(id);
  }

  @Get('category/:id')
  @ApiOperation({ summary: 'Поиск всех продуктов по айди категории' })
  @ApiParam({ name: 'id', type: 'string' })
  getAllProductsByIDCategory(@Param('id') id: string) {
    return this.productService.getAllProductsByIDCategory(id);
  }

  @Get('/search/:name')
  @ApiOperation({ summary: 'Поиск по названию всех продуктов (лимит 10)' })
  @ApiParam({ name: 'name', type: 'string' })
  searchTenProductsByPartName(@Param('name') partName: string) {
    return this.productService.searchTenProductByPartName(partName);
  }

  @Get('/searchAll/:name')
  @ApiOperation({ summary: 'Поиск по названию всех продуктов' })
  @ApiParam({ name: 'name', type: 'string' })
  searchAllProductsByPartName(@Param('name') partName: string) {
    return this.productService.searchAllProductByPartName(partName);
  }

  @Get('/search/company/:user_id')
  @ApiOperation({
    summary: 'Поиск продуктов по пользователю, на которого привязана компания',
  })
  @ApiParam({ name: 'user_id', type: 'string' })
  searchAllProductsByCompany(@Param('user_id') id: string) {
    return this.productService.findProductsByCompany(id);
  }
}
