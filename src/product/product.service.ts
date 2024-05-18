import {Injectable} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {Repository} from "typeorm";
import {Category} from "../category/entities/category.entity";

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private repository: Repository<Product>) {
    }

    createProduct(data: CreateProductDto, file: Express.Multer.File) {
        return this.repository.save({
            article: data.article,
            product_name: data.product_name,
            product_description: data.product_description,
            product_image: file.filename,
            category: data.category_id
        })
    }

    removeProduct(data: CreateProductDto) {
        return this.repository.delete({product_id: data.product_id})
    }

    getProductByID(id: string) {
        return this.repository.findOneBy({product_id: id})
    }

    getAllProductsByIDCategory(id: string) {

        return this.repository.findBy({
            category:{category_id:id}
        })
    }

}
