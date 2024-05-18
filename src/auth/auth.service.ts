import {BadRequestException, ForbiddenException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "../user/entities/user.entity";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {compare} from "bcrypt";


@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);

        const isPasswordMatch = await compare(password, user.password)
        if (user && isPasswordMatch) {
            const {password, ...result} = user;
            return result;
        }

        return null;
    }

    async register(dto: CreateUserDto) {
        try {
            const {email} = dto
            const userEmail = await this.userService.findByEmail(email)
            // const userLogin = await this.userService.findByLogin(login)
            //if(!userLogin && !userEmail) {
            if (!userEmail) {
                const userData = await this.userService.create(dto)

                return {user:dto,token: this.jwtService.sign({id: userData.id, role: userData.role})}
            }
            await Promise.reject('')
           // else throw new BadRequestException('Пользователь с такой почтой существует')
        } catch (err) {
            throw new ForbiddenException('Ошибка при регистрации')
        }
    }

    async login(user: User) {
        return {user:user,token: this.jwtService.sign({id: user.id, role: user.role})}
    }

}
