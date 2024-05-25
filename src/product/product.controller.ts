import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator, Param,
    ParseFilePipe,
    Post,
    Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {ProductService} from './product.service';
import {CreateProductDto} from './dto/create-product.dto';
import {ApiConsumes, ApiOperation, ApiParam, ApiQuery, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {fileStorage} from "./storageFilesProducts";



@Controller('product')
@ApiTags('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @Post('/create')
    @UseInterceptors(FileInterceptor('product_image', {storage: fileStorage}))
    @ApiOperation({summary:'Создание продукта'})
    @ApiConsumes('multipart/form-data') //type req
    create(
        @UploadedFile(new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({maxSize: 1024 * 1024 * 5}),
                    new FileTypeValidator({fileType: '/png|jpeg/'})
                ]
            })
        )
            file: Express.Multer.File,
        @Body() dto: CreateProductDto) {
        return this.productService.createProduct(dto, file)
    }

    @Delete('/delete')
    @ApiOperation({summary:'Удаление продукта'})
    removeProduct(@Body() dto: CreateProductDto) {
        return this.productService.removeProduct(dto)
    }

    @Get(':id')
    @ApiOperation({summary:'Поиск по айди продукта'})
    @ApiParam({name:'id',type:'string'})
    getProductById(@Param('id') id:string) {
        return this.productService.getProductByID(id)
    }

    @Get('category/:id')
    @ApiOperation({summary:'Поиск всех продуктов по айди категории'})
    @ApiParam({name:'id',type:'string'})
    getAllProductsByIDCategory(@Param('id') id:string){
        return this.productService.getAllProductsByIDCategory(id)
    }

    @Get('/search/:name')
    @ApiOperation({summary:'Поиск по названию всех продуктов'})
    @ApiParam({name:'name',type:'string'})
    searchAllProductsByPartName(@Param('name') partName:string){
        return this.productService.searchProductByPartName(partName)
    }
}
