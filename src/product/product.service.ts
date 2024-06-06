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

  private delFileImage = async (image_name: string) => {
    if (image_name !== null) {
      const arrayFilesName = image_name.split(',');
      for (const item of arrayFilesName) {
        if (item !== '') {
          const path = `${pathUploadProduct}/${item}`;
          if (await fs.stat(path)) {
            await fs.unlink(path);
          }
        }
      }
    }
  };

  private createFilenameString = (files: object) => {
    let resultFileName = '';
    if ('product_image' in files) {
      const arrayFiles = files.product_image;
      if (Array.isArray(arrayFiles))
        arrayFiles.forEach(
          (itemFile) => (resultFileName += itemFile.filename + ','),
        );
    }
    return resultFileName;
  };

  createProduct(data: CreateProductDto, files?: Express.Multer.File[]) {
    const resultFileName = this.createFilenameString(files);
    return this.repository.save({
      article: data.article,
      product_name: data.product_name,
      product_description: data.product_description,
      product_image: resultFileName,
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
    await this.delFileImage(product_image);
    return this.repository.delete({ product_id: data.product_id });
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

  async updateProduct(data: CreateProductDto, files?: Express.Multer.File[]) {
    console.log(files);
    const productFound = await this.repository.findOneBy({
      product_id: data.product_id,
    });

    if (productFound === null) {
      throw new HttpException(
        'Не удалось обновить продукт',
        HttpStatus.NOT_FOUND,
      );
    }
    if ('product_image' in files) {
      const product_image = productFound.product_image;
      await this.delFileImage(product_image);
      const resultFilename = this.createFilenameString(files);
      return this.repository.update(
        { product_id: data.product_id },
        {
          article: data.article,
          product_name: data.product_name,
          product_description: data.product_description,
          product_price: data.product_price,
          product_discount: data.product_discount,
          product_image: resultFilename,
          category: data.category_id,
        },
      );
    } else
      return this.repository.update(
        { product_id: data.product_id },
        {
          article: data.article,
          product_name: data.product_name,
          product_description: data.product_description,
          product_price: data.product_price,
          product_discount: data.product_discount,
          category: data.category_id,
        },
      );
  }
}
