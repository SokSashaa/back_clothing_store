import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Repository } from 'typeorm';
import * as fs from 'node:fs/promises';
import { pathUploadCategory } from './storageFilesCategories';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  private delFileImage = async (image_name: string) => {
    if (image_name !== null) {
      const path = `${pathUploadCategory}/${image_name}`;
      if (await fs.stat(path)) {
        await fs.unlink(path);
      }
    }
  };

  create(dto: CreateCategoryDto, file?: Express.Multer.File) {
    return this.repository.save({
      category_name: dto.category_name,
      category_img_name: file?.filename,
    });
  }

  getAllCategories() {
    return this.repository.query('Select * from category');
  }

  async remove(data: CreateCategoryDto) {
    const category = await this.repository.findOneBy({
      category_id: data.category_id,
    });
    if (category === null) {
      throw new HttpException(
        'Не удалось удалить категорию',
        HttpStatus.NOT_FOUND,
      );
    }
    const category_image = category.category_img_name;
    await this.delFileImage(category_image);
    return this.repository.delete({ category_id: data.category_id });
  }

  async getCategoryByID(id: string) {
    const result = await this.repository.findOneBy({ category_id: id });
    if (result === null) {
      throw new HttpException('Категория не найдена', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateCategory(data: CreateCategoryDto, file?: Express.Multer.File) {
    const categoryFound = await this.repository.findOneBy({
      category_id: data.category_id,
    });

    if (categoryFound === null) {
      throw new HttpException(
        'Не удалось обновить категорию',
        HttpStatus.NOT_FOUND,
      );
    }

    if (file) {
      const category_image = categoryFound.category_img_name;
      await this.delFileImage(category_image);
      return this.repository.update(
        { category_id: data.category_id },
        {
          category_name: data.category_name,
          category_img_name: file.filename,
        },
      );
    } else
      return this.repository.update(
        { category_id: data.category_id },
        {
          category_name: data.category_name,
        },
      );
  }
}
