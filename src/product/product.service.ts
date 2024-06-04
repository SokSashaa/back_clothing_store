import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as fs from 'node:fs/promises';
import { pathUploadProduct } from './storageFilesProducts';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
  ) {}

  createProduct(data: CreateProductDto, file: Express.Multer.File) {
    return this.repository.save({
      article: data.article,
      product_name: data.product_name,
      product_description: data.product_description,
      product_image: file.filename,
      product_price: data.product_price,
      product_discount: data.product_discount,
      category: data.category_id,
      company: data.company_id,
    });
  }

  async removeProduct(data: CreateProductDto) {
    const product = await this.repository.findOneBy({
      product_id: data.product_id,
    });
    if (product === null) {
      throw new HttpException(
        'Не удалось удалить продукт',
        HttpStatus.NOT_FOUND,
      );
    }
    const product_image = product.product_image;
    const path = `${pathUploadProduct}/${product_image}`;
    if (await fs.stat(path)) {
      await fs.unlink(path);
      return this.repository.delete({ product_id: data.product_id });
    }
  }

  getProductByID(id: string) {
    return this.repository.findOneBy({ product_id: id });
  }

  getAllProductsByIDCategory(id: string) {
    return this.repository.findBy({
      category: { category_id: id },
    });
  }

  searchTenProductByPartName(partName: string) {
    return this.repository.query(
      `select * from product where product_name ILIKE '%${partName}%' order by product_name limit 10`,
    );
  }

  searchAllProductByPartName(partName: string) {
    return this.repository.query(
      `select * from product where product_name ILIKE '%${partName}%' order by product_name`,
    );
  }

  updateProduct(data: CreateProductDto) {
    return this.repository.update(
      { product_id: data.product_id },
      {
        ...data,
      },
    );
  }
}
