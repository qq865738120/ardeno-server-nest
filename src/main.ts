import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ServiceHttpExceptionFilter } from './common/filters/service-http-exception.filter';

async function bootstrap() {
  const env = config.util.getEnv('NODE_ENV') || 'development';
  Logger.log(`启动环境：${env}`, 'main');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new ServiceHttpExceptionFilter());

  const documentConfig = new DocumentBuilder()
    .setTitle('API文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(
    config.get<any>('server').port,
    config.get<any>('server').host,
  );
}
bootstrap();
