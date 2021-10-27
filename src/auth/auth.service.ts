import { ServiceCodeEnum } from '@/common/enums/service-code.enum';
import { ServiceHttpException } from '@/common/exceptions/service-http-exception';
import { CreateUserRequestDto } from '@/user/dto/create-user-request.dto';
import { UserLoginRequestDto } from '@/user/dto/user-login-request.dto';
import { UserService } from '@/user/user.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 注册
   *
   * @param {CreateUserRequestDto} createUserRequestDto
   * @returns
   * @memberof AuthService
   */
  async register(createUserRequestDto: CreateUserRequestDto) {
    return await this.userService.createUser(createUserRequestDto);
  }

  async findAll() {
    return await this.userService.findAll();
  }

  /**
   * 登录
   *
   * @param {UserLoginRequestDto} userLoginRequestDto
   * @returns
   * @memberof AuthService
   */
  async login(userLoginRequestDto: UserLoginRequestDto) {
    const user = await this.userService.findUsername(
      userLoginRequestDto.username,
      ['id', 'username'],
    );

    if (user) {
      const token = this.createToken(user.username, user.id);
      return {
        ...user,
        token,
      };
    }
    return null;
  }

  /**
   * 校验用户
   *
   * @param {string} username - 用户名
   * @param {string} pass - 密码
   * @memberof AuthService
   */
  async validateUser(username: string, pass: string) {
    const user = await this.userService.findUsername(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      return true;
    } else {
      throw new ServiceHttpException(
        ServiceCodeEnum.INCORRECT_PASSWORD,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  /**
   * 生成登录token
   *
   * @param {string} username - 用户名
   * @param {number} userId - 用户id
   * @returns - token字符串
   * @memberof AuthService
   */
  createToken(username: string, userId: number) {
    const payload = { username, userId };
    return this.jwtService.sign(payload);
  }
}
