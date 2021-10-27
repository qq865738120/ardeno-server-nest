import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

const TYPEORM_MODULE = TypeOrmModule.forFeature([UserEntity]);

@Module({
  imports: [TYPEORM_MODULE, UserModule],
  exports: [UserService],
  providers: [UserService],
})
export class UserModule {}
