import { ServiceCodeEnum } from '@/common/enums/service-code.enum';
import { ServiceMessageEnum } from '@/common/enums/service-message.enum';
import { ServiceHttpException } from '@/common/exceptions/service-http-exception';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 创建用户
   *
   * @param {CreateUserRequestDto} createUserRequestDto
   * @returns
   * @memberof UserService
   */
  async createUser(createUserRequestDto: CreateUserRequestDto) {
    const userInfo = await this.findUsername(createUserRequestDto.username);
    if (userInfo) {
      throw new ServiceHttpException(
        ServiceCodeEnum.USER_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.userRepository.create(createUserRequestDto);
    return await this.userRepository.save(user);
  }

  /**
   * 通过username查询单个用户
   *
   * @param {string} username - 用户名
   * @param {(keyof UserEntity)[]} [select] - 返回的数据列
   * @returns
   * @memberof UserService
   */
  async findUsername(username: string, select?: (keyof UserEntity)[]) {
    const user = await this.userRepository.findOne({
      where: { username },
      select,
    });
    return user;
  }

  /**
   * 查询所有用户
   *
   * @returns
   * @memberof UserService
   */
  async findAll() {
    return this.userRepository.find();
  }
}
