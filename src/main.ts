import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {join} from "path";
import * as express from 'express'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({credentials: true, origin: true});

    const config = new DocumentBuilder()
        .setTitle('Api Example')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document, {
        swaggerOptions: {
            persistAuthorization:true,
        }
    });

    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

    await app.listen(3001);
}

bootstrap();
