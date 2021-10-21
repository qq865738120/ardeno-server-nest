import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyTestModule } from './my-test/my-test.module';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';

const env = config.util.getEnv('NODE_ENV') || 'development';
Logger.log(`启动环境：${env}`, 'AppModule');

@Module({
  imports: [MyTestModule, TypeOrmModule.forRoot(config.get('database'))],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
