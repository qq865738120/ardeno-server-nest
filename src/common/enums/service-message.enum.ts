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
  ENTERPRISE_WEIXIN_GET_TOKEN_FAIL = '企业微信token获取失败',
  ENTERPRISE_WEIXIN_GET_NO_LIST_FAIL = '企业微信审批列表获取失败',
  ENTERPRISE_WEIXIN_GET_NO_INFO_FAIL = '企业微信审批详情获取失败',
  ENTERPRISE_WEIXIN_GET_TEMPLATE_INFO_FAIL = '企业微信获取模版详情失败',
}
