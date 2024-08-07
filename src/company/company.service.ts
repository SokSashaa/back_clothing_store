import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { UserService } from '../user/user.service';
import { Roles } from '../user/consts/enums';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private repository: Repository<Company>,
    private userService: UserService,
  ) {}

  async createCompany(data: CreateCompanyDto) {
    const user = await this.userService.findById(data.user_id.toString());
    if (user.role === Roles.producer || user.role === Roles.admin) {
      return this.repository
        .save({
          name: data.name,
          inn: data.inn,
          ogrn: data.ogrn,
          address: data.address,
          user_id: data.user_id,
        })
        .catch((e) => {
          throw new HttpException(
            'Неверные данные. Проверьте данные на уникальность',
            HttpStatus.BAD_REQUEST,
          );
        });
    } else
      throw new HttpException(
        'Пользователь не продавец',
        HttpStatus.BAD_REQUEST,
      );
  }

  async deleteCompany(data: CreateCompanyDto) {
    const result = await this.repository.delete({
      id: data.id,
    });
    if (result.affected > 0) return result;
    else
      throw new HttpException(
        'Не найдена компания для удаления',
        HttpStatus.BAD_REQUEST,
      );
  }

  async updateInfoCompany(data: CreateCompanyDto) {
    const user = await this.userService.findById(data.user_id.toString());
    if (user.role === Roles.producer || user.role === Roles.admin) {
      const result = await this.repository
        .update(
          { id: data.id },
          {
            name: data.name,
            inn: data.inn,
            ogrn: data.ogrn,
            address: data.address,
            user_id: data.user_id,
          },
        )
        .catch((e) => {
          throw new HttpException(
            'Произошла ошибка при обновлении',
            HttpStatus.BAD_REQUEST,
          );
        });
      if (result.affected > 0) return result;
      else
        throw new HttpException(
          'Компания для обновления не найдена',
          HttpStatus.BAD_REQUEST,
        );
    } else
      throw new HttpException(
        'Пользователь не продавец',
        HttpStatus.BAD_REQUEST,
      );
  }

  async findCompanyByINN(inn: string) {
    const result = (
      await this.repository
        .createQueryBuilder('comp')
        .where('comp.inn like :inn', { inn: `%${inn}%` })
        .innerJoinAndSelect('comp.user_id', 'user')
        .getMany()
    ).map((item) => ({
      ...item,
      user_id: { id: item.user_id.id, email: item.user_id.email },
    }));
    return result;
  }

  async findCompanyByUser(user_id: string) {
    const result = await this.repository.findOneBy({
      user_id: {
        id: user_id,
      },
    });
    if (result) return result;
    else
      throw new HttpException(
        'Компания на данного юзера не зарегистрирована',
        HttpStatus.NOT_FOUND,
      );
  }

  async getAllCompanies(): Promise<Company[]> {
    return this.repository
      .createQueryBuilder('c')
      .select('c.id')
      .addSelect('c.name')
      .getMany();
  }
}
