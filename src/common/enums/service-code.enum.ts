/**
 * 业务码枚举
 *
 * @export
 * @enum {number}
 */
export enum ServiceCodeEnum {
  /**
   * 成功
   */
  SUCCESS = 100000,

  /**
   * 未授权
   */
  UNAUTHORIZED = 100001,

  /**
   * 密码不正确
   */
  INCORRECT_PASSWORD = 100002,

  /**
   * 用户已存在
   */
  USER_ALREADY_EXISTS = 100003,
}
