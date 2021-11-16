import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ServiceHttpExceptionFilter } from './common/filters/service-http-exception.filter';
import { fastifyHelmet } from 'fastify-helmet';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const env = config.util.getEnv('NODE_ENV') || 'development';
  Logger.log(`启动环境：${env}`, 'main');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: true,
    },
  );

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '1',
  });

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ServiceHttpExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.register(fastifyHelmet);

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
