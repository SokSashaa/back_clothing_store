import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {User} from "../user/entities/user.entity";
import {LocalGuard} from './guards/local.guard';


@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(LocalGuard)
    @Post('/login')
    @ApiBody({type: CreateUserDto})
    async login(@Request() req) {
        console.log(req.user)
        return this.authService.login(req.user as User)
    }

    @Post('/register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto)
    }
}
