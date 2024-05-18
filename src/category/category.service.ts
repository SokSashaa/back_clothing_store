import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./entities/category.entity";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {Repository} from "typeorm";


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

    remove(dto:CreateCategoryDto) {
        return this.repository.delete({category_id:dto.category_id})
    }

    getCategoryByID(id:string){
        return this.repository.findOneBy({category_id:id})
    }
}
