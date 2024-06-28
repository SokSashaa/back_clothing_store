import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Category } from './category/entities/category.entity';
import { Product } from './product/entities/product.entity';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './company/company.module';
import { Company } from './company/entities/company.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    UserModule,
    ProductModule,
    CategoryModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESS_DB_URL,
      port: Number(process.env.POSTGRESS_DB_PORT),
      username: process.env.POSTGRESS_DB_USER,
      password: process.env.POSTGRESS_DB_PASSWORD,
      database: process.env.POSTGRESS_DB_NAME,
      entities: [User, Category, Product, Company],
      synchronize: true,
    }),
    CompanyModule,
    CacheModule.register({
      ttl: 1000,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
