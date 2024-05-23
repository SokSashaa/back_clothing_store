import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./entities/category.entity";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Repository} from "typeorm";
import * as fs from 'node:fs/promises'
import {pathUploadCategory} from "./storageFilesCategories";


@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private repository: Repository<Category>) {
    }

    create(file: Express.Multer.File, dto: CreateCategoryDto) {
        return this.repository.save({
            category_name: dto.category_name,
            category_img_name: file.filename
        })
    }

    getAllCategories () {
        return this.repository.query('Select * from category')
    }

    async remove(data:CreateCategoryDto) {
        const category = await this.repository.findOneBy({category_id: data.category_id})
        if (category === null) {
            throw new HttpException('Не удалось удалить продукт', HttpStatus.NOT_FOUND)
        }
        const category_image = category.category_img_name;
        const path = `${pathUploadCategory}/${category_image}`
        if (await fs.stat(path)) {
            await fs.unlink(path)
            return this.repository.delete({category_id:data.category_id})
        }
    }

    getCategoryByID(id:string){
        return this.repository.findOneBy({category_id:id})
    }
}
