import { ResponseStatusEnum } from '../enums/response-status.enum';
import { ServiceCodeEnum } from '../enums/service-code.enum';
import { ServiceMessageEnum } from '../enums/service-message.enum';

/**
 * response管理类
 *
 * @export
 * @class ResponseManager
 */
export class ResponseManager {
  private code: ServiceCodeEnum;
  private message: ServiceMessageEnum;
  private data;
  private status: ResponseStatusEnum;
  private readonly successCodeArr = [100000];

  constructor(code: ServiceCodeEnum, data) {
    this.code = code;
    this.message = ServiceMessageEnum[ServiceCodeEnum[code]];
    this.data = data;
    this._initStatus();
  }

  private _initStatus() {
    const { code } = this;
    this.status = this.successCodeArr.includes(code)
      ? ResponseStatusEnum.SUCCESS
      : ResponseStatusEnum.ERROR;
    // if (code >= 100000 && code < 200000) {
    //   this.status = ResponseStatusEnum.SUCCESS;
    // } else if (code >= 200000 && code < 300000) {
    //   this.status = ResponseStatusEnum.ERROR;
    // }
  }

  setCode(code: ServiceCodeEnum) {
    this.code = code;
    this.message = ServiceMessageEnum[ServiceCodeEnum[code]];
    this._initStatus();
  }

  setData(data) {
    this.data = data;
  }

  /**
   * 获取response
   *
   * @returns
   * @memberof ResponseManager
   */
  getResponse() {
    return {
      code: this.code,
      data: this.data,
      message: this.message,
      status: this.status,
    };
  }
}
