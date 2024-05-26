import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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

  async removeUser(data: CreateUserDto) {
    return this.repository.delete({ id: data.id });
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

  async updateUser(data: CreateUserDto) {
    const { password, ...result } = data;
    return this.repository.update({ id: data.id }, { ...result });
  }
}
