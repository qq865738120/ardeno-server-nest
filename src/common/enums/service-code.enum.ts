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

  /**
   * 企业微信token获取失败
   */
  ENTERPRISE_WEIXIN_GET_TOKEN_FAIL = 200000,

  /**
   * 企业微信审批列表获取失败
   */
  ENTERPRISE_WEIXIN_GET_NO_LIST_FAIL = 200001,

  /**
   * 企业微信审批详情获取失败
   */
  ENTERPRISE_WEIXIN_GET_NO_INFO_FAIL = 200002,

  /**
   * 企业微信获取模版详情失败
   */
  ENTERPRISE_WEIXIN_GET_TEMPLATE_INFO_FAIL = 200003,
}
