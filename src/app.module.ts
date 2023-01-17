import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyTestModule } from './my-test/my-test.module';
import { PersonalPageModule } from './personal-page/personal-page.module';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LedgerModule } from './ledger/ledger.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MyTestModule,
    PersonalPageModule,
    TypeOrmModule.forRoot(config.get('database')),
    UserModule,
    AuthModule,
    LedgerModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
