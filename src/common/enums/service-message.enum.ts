/**
 * 业务消息枚举，与业务码一一对应
 *
 * @export
 * @enum {number}
 */
export enum ServiceMessageEnum {
  SUCCESS = '成功',
  UNAUTHORIZED = '未授权',
  INCORRECT_PASSWORD = '密码不正确',
  USER_ALREADY_EXISTS = '用户已存在',
}
