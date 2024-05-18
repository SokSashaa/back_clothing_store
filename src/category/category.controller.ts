import {
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {CategoryService} from './category.service';
import {CreateCategoryDto} from './dto/create-category.dto';
import {ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {fileStorage} from "./storageFilesCategories";

@Controller('category')
@ApiTags('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {
    }

    @Get()
    @ApiOperation({summary: 'Получение всех категорий'})
    getAllCategories() {
        return this.categoryService.getAllCategories()
    }

    @Delete()
    @ApiOperation({summary: 'Удаление категории'})
    removeCategory(@Body() dto: CreateCategoryDto) {
        return this.categoryService.remove(dto)
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', {storage: fileStorage}))
    @ApiOperation({summary: 'Создание категории'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                },
                category_name: {
                    type: 'string',
                    default: 'СИЗ'
                },
            },
        },
    })
    create(@UploadedFile(new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({maxSize: 1024 * 1024 * 5}),
                new FileTypeValidator({fileType: '/png|jpeg/'})
            ]
        })
    )
               file: Express.Multer.File, @Body() dto: CreateCategoryDto) {
        return this.categoryService.create(file, dto)
    }

    @Get(':id')
    @ApiOperation({summary: 'Поиск по айди категории'})
    @ApiParam({name: 'id', type: 'string'})
    getCategoryByID(@Param('id') id: string) {
        return this.categoryService.getCategoryByID(id)
    }
}
