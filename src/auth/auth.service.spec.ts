import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import * as config from 'config';
import { UserService } from '@/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '@/user/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: config.get<any>('jwt').secret,
          signOptions: { expiresIn: config.get<any>('jwt').expiration },
        }),
      ],
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
