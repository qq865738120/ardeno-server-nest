import { HttpException } from '@nestjs/common';
import { ServiceCodeEnum } from '../enums/service-code.enum';
import { ServiceMessageEnum } from '../enums/service-message.enum';

/**
 * 业务http异常
 *
 * @export
 * @class ServiceHttpException
 * @extends {HttpException}
 */
export class ServiceHttpException extends HttpException {
  private readonly code: ServiceCodeEnum;

  constructor(code: ServiceCodeEnum, status: number) {
    super(ServiceMessageEnum[ServiceCodeEnum[code]], status);
    this.code = code;
  }

  getCode() {
    return this.code;
  }
}
