import { ServiceCodeEnum } from '@/common/enums/service-code.enum';
import { ServiceHttpException } from '@/common/exceptions/service-http-exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * 校验用户密码
   *
   * @param {string} username - 用户名
   * @param {string} password - 密码
   * @returns
   * @memberof LocalStrategy
   */
  async validate(username: string, password: string) {
    const isValidate = await this.authService.validateUser(username, password);
    if (!isValidate) {
      throw new ServiceHttpException(
        ServiceCodeEnum.UNAUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return isValidate;
  }
}
