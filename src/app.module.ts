import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user/entities/user.entity";
import {Category} from "./category/entities/category.entity";
import {Product} from "./product/entities/product.entity";
import * as process from "process";
import {ConfigModule} from "@nestjs/config";



@Module({
  imports: [UserModule, ProductModule, CategoryModule, AuthModule,ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESS_DB_URL,
      port: Number(process.env.POSTGRESS_DB_PORT),
      username: process.env.POSTGRESS_DB_USER,
      password: process.env.POSTGRESS_DB_PASSWORD,
      database: process.env.POSTGRESS_DB_NAME,
      entities: [User,Category,Product],
      synchronize: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
