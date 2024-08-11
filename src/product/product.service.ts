import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as fs from 'node:fs/promises';
import { pathUploadProduct } from './storageFilesProducts';
import { CompanyService } from '../company/company.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repository: Repository<Product>,
    private companyService: CompanyService,
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

  async createProduct(data: CreateProductDto, files?: Express.Multer.File[]) {
    const resultFileName = this.createFilenameString(files);
    return this.repository
      .save({
        article: data.article,
        product_name: data.product_name,
        product_description: data.product_description,
        product_image: resultFileName,
        product_price: data.product_price,
        product_discount: data.product_discount,
        category: data.category_id,
        company: data.company_id,
      })
      .catch(async () => {
        await this.delFileImage(resultFileName);
        throw new HttpException('Произошла ошибка', HttpStatus.BAD_REQUEST);
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

  async getProductByID(id: string) {
    const result = await this.repository.findOneBy({ product_id: id });
    if (result === null) {
      throw new HttpException('Не удалось найти продукт', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  getAllProductsByIDCategory(id: string) {
    return this.repository.query(
      `select * from product where category_id=${id}`,
    );
    // return this.repository.find({
    //   where: { category: { category_id: id } },
    //   select: {
    //     product_id: true,
    //     product_price: true,
    //     product_discount: true,
    //     product_name: true,
    //     product_description: true,
    //     product_image: true,
    //     article: true,
    //     company: { id: true },
    //   },
    // });
    // return this.repository
    //   .createQueryBuilder('pr')
    //   .select('*')
    //   .where('pr.category_id =:id', { id: id })
    //   .getMany();
    // .select('pr.product_id')
    // .addSelect('pr.article')
    // .addSelect('pr.product_name')
    // .addSelect('pr.product_description')
    // .addSelect('pr.product_image')
    // .addSelect('pr.product_price')
    // .addSelect('pr.product_discount')
    // .addSelect('pr.company_id')
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
    let isError = false;
    const productFound = await this.repository.findOneBy({
      product_id: data.product_id,
    });

    if (productFound === null) {
      throw new HttpException(
        'Не удалось обновить продукт',
        HttpStatus.NOT_FOUND,
      );
    }
    if (files && 'product_image' in files) {
      const product_image = productFound.product_image;
      const resultFilename = this.createFilenameString(files);
      return this.repository
        .update(
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
        )
        .catch(async () => {
          isError = true;
          await this.delFileImage(resultFilename); // delete new files
          throw new HttpException(
            'Не удалось обновить',
            HttpStatus.BAD_REQUEST,
          );
        })
        .finally(async () => {
          if (!isError) await this.delFileImage(product_image); // delete old files
        });
    } else {
      const r = await this.repository
        .update(
          { product_id: data.product_id },
          {
            article: data.article,
            product_name: data.product_name,
            product_description: data.product_description,
            product_price: data.product_price,
            product_discount: data.product_discount,
            category: data.category_id,
          },
        )
        .catch(() => {
          throw new HttpException(
            'Не удалось обновить',
            HttpStatus.BAD_REQUEST,
          );
        });
      return r;
    }
  }

  async findProductsByCompany(id: string) {
    const company = await this.companyService.findCompanyByUser(id);
    if (company) {
      return this.repository
        .createQueryBuilder('pr')
        .where('pr.company_id=:id', { id: company.id })
        .innerJoinAndSelect('pr.category', 'category_id')
        .getMany();

      // return this.repository.find({
      //   where: {
      //     company: {
      //       id: user.id,
      //     },
      //   },
      // });
    }
  }
}
