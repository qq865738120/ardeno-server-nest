import * as NodeRSA from 'node-rsa';
import * as config from 'config';

class RsaUtil {
  private readonly keyData: string = config.get<any>('rsaKey');
  private readonly key: NodeRSA;

  constructor() {
    this.key = new NodeRSA({ b: 512 });
  }

  /**
   * 生成公钥
   *
   * @returns
   * @memberof RsaUtil
   */
  generatePublicKey() {
    return this.key.exportKey('pkcs1-public');
  }

  /**
   * 加密
   *
   * @param {string} text
   * @memberof RsaUtil
   */
  encrypt(text: string) {
    return this.key.encrypt(text, 'base64');
  }

  /**
   * 解密
   *
   * @param {string} text
   * @returns
   * @memberof RsaUtil
   */
  decrypt(text: string) {
    return this.key.decrypt(text, 'utf8');
  }
}

export default new RsaUtil();
