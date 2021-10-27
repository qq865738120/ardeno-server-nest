import { UserModule } from '@/user/user.module';
import { UserService } from '@/user/user.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import * as config from 'config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: config.get<any>('jwt').secret,
      signOptions: { expiresIn: config.get<any>('jwt').expiration },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
