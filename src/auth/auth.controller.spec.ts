import { UserModule } from '@/user/user.module';
import { UserService } from '@/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import * as config from 'config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '@/user/user.entity';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: config.get<any>('jwt').secret,
          signOptions: { expiresIn: config.get<any>('jwt').expiration },
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(''),
            find: jest.fn().mockResolvedValue(['']),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
