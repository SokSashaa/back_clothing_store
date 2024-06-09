import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const salt = await genSalt(10);

    const hashedPassword = await hash(dto.password, salt);

    const newUser = this.repository.create({
      ...dto,
      password: hashedPassword,
    });

    return await this.repository.save(newUser);
  }

  async findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async removeUser(user_id: string) {
    const result = await this.repository.delete({ id: user_id });
    if (result.raw > 0) return result;
    else
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async getAllUsers() {
    return this.repository
      .createQueryBuilder('user')
      .select('user.id')
      .addSelect('user.firstname')
      .addSelect('user.lastname')
      .addSelect('user.email')
      .addSelect('user.role')
      .addSelect('user.date_reg')
      .addSelect('user.date_birthday')
      .getMany();
  }

  async updateUser(data: UpdateUserDto) {
    const isEmailHas = await this.findByEmail(data.email);
    if (!isEmailHas || isEmailHas.id === data.id) {
      const result = await this.repository.update({ id: data.id }, { ...data });
      if (result.affected > 0) return result;
      else
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    } else
      throw new HttpException(
        'Пользователь с такой почтой существует',
        HttpStatus.BAD_REQUEST,
      );
  }

  findUserByEmail(email: string) {
    return this.repository.find({
      where: {
        email: ILike(`%${email}%`),
      },
      select: {
        id: true,
        email: true,
        firstname: true,
        lastname: true,
        date_birthday: true,
        date_reg: true,
        role: true,
      },
    });
  }
}
