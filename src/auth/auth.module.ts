import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UserModule} from "../user/user.module";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {LocalStrategy} from "./strategies/local.strategy";
import {PassportModule} from "@nestjs/passport";

@Module({
    controllers: [AuthController],
    providers: [AuthService,JwtStrategy,LocalStrategy],
    imports: [UserModule, PassportModule,JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configServices: ConfigService) => {
            return {
                secret: configServices.get('SECRET_KEY'),
                signOptions: {
                    expiresIn: configServices.get('EXPIRES_IN')
                }
            }
        }
    })],
})
export class AuthModule {
}
