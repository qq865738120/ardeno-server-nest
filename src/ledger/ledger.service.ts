import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Not, Repository } from 'typeorm';
import { LedgerEntity } from './ledger.entity';
import { HttpService } from '@nestjs/axios';
import * as config from 'config';
import { lastValueFrom, Observable } from 'rxjs';
import { ServiceHttpException } from '@/common/exceptions/service-http-exception';
import { ServiceCodeEnum } from '@/common/enums/service-code.enum';
import tools from '@/common/utils/tools';

@Injectable()
export class LedgerService {
  private readonly logger = new Logger(LedgerService.name);
  config: any = config.get('enterpriseWeixin');
  token: any = {};

  constructor(
    @InjectRepository(LedgerEntity)
    private readonly ledgerRepository: Repository<LedgerEntity>,
    private readonly httpService: HttpService,
  ) {}

  /**
   * 获取企业微信token
   */
  async getToken() {
    if (
      this.token.expiresTime &&
      this.token.expiresTime > new Date().getTime() / 1000
    ) {
      return this.token.accessToken as string;
    }

    const tokenObservable = this.httpService.get(
      `${this.config.host}/cgi-bin/gettoken?corpid=${this.config.corpid}&corpsecret=${this.config.ledger.corpsecret}`,
    );
    const res = (await lastValueFrom(tokenObservable)).data;
    this.logger.log(res, '企业微信token结果');
    if (res.errcode !== 0) {
      throw new ServiceHttpException(
        ServiceCodeEnum.ENTERPRISE_WEIXIN_GET_TOKEN_FAIL,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    this.token = {
      accessToken: res.access_token,
      expiresTime: Number(new Date().getTime() / 1000 + 7200),
    };
    return res.access_token as string;
  }

  /**
   * 获取审批账单单号列表
   * @param starttime -开始时间，单位秒
   * @param endtime -结束时间，单位秒
   * @returns 审批列表
   */
  async queryNoList(starttime: string, endtime: string) {
    const token = await this.getToken();
    const noListObservable = this.httpService.post(
      `${this.config.host}/cgi-bin/oa/getapprovalinfo?access_token=${token}`,
      {
        starttime: starttime || '1673300835',
        endtime: endtime || '1673600835',
        cursor: 0,
        size: 100,
      },
    );
    const res = (await lastValueFrom(noListObservable)).data;
    this.logger.log(res, '企业微信审批单号列表结果');
    if (res.errcode !== 0) {
      throw new ServiceHttpException(
        ServiceCodeEnum.ENTERPRISE_WEIXIN_GET_NO_LIST_FAIL,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return (res.sp_no_list || []) as string[];
  }

  /**
   * 查询审批详情
   * @param no -审批编号
   * @returns 审批详情
   */
  async queryNoInfo(no: string) {
    const token = await this.getToken();
    const noInfoObservable = this.httpService.post(
      `${this.config.host}/cgi-bin/oa/getapprovaldetail?access_token=${token}`,
      {
        sp_no: no || '202301130001',
      },
    );
    const res = (await lastValueFrom(noInfoObservable)).data;
    this.logger.log(res, '企业微信审批单号详情结果');
    if (res.errcode !== 0) {
      throw new ServiceHttpException(
        ServiceCodeEnum.ENTERPRISE_WEIXIN_GET_NO_INFO_FAIL,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return res.info || {};
  }

  /**
   * 保存审批详情
   * @param noInfo -审批详情
   */
  async saveNoInfo(noInfo) {
    const detail = tools.findObjFromArr(
      noInfo.apply_data.contents,
      'id',
      'item-1503317853434',
      {},
    ).value.children[0].list;
    const result = await this.ledgerRepository.save<LedgerEntity>({
      id: noInfo.sp_no,
      spStatus: noInfo.sp_status,
      type: tools.findObjFromArr(
        noInfo.apply_data.contents,
        'id',
        'item-1503317593875',
        {},
      ).value.selector.options[0].value[0].text,
      reason: tools.findObjFromArr(
        noInfo.apply_data.contents,
        'id',
        'item-1503317835288',
        {},
      ).value.text,
      costType: tools.findObjFromArr(detail, 'id', 'item-1503317870534', {})
        .value.selector.options[0].value[0].text,
      time: new Date(
        Number(
          tools.findObjFromArr(detail, 'id', 'item-1503317973968', {}).value
            .date.s_timestamp + '000',
        ),
      )
        .toISOString()
        .split('T')[0],
      costAmount: tools.findObjFromArr(detail, 'id', 'item-1503317989302', {})
        .value.new_money,
      costDescription: tools.findObjFromArr(
        detail,
        'id',
        'item-1503318001306',
        {},
      ).value.text,
      attachment:
        (
          tools.findObjFromArr(detail, 'id', 'item-1503385054053', {}).value
            .files[0] || {}
        ).file_id || null,
    });
    this.logger.log(result, '保存审批详情结果');
    return result;
  }

  /**
   * 更新审批列表
   * @param starttime -开始时间戳，单位秒
   * @param endtime -结束时间戳，单位秒
   */
  async updateNoList(starttime: string, endtime: string) {
    const list = await this.queryNoList(starttime, endtime);
    for (let index = 0; index < list.length; index++) {
      const info = await this.queryNoInfo(list[index]);
      await tools.sleep(100);
      await this.saveNoInfo(info);
    }
  }

  /**
   * 查询模版详情
   * @returns 模版详情
   */
  async queryTemplateInfo() {
    const token = await this.getToken();
    const templateObservable = this.httpService.post(
      `${this.config.host}/cgi-bin/oa/gettemplatedetail?access_token=${token}`,
      {
        template_id: this.config.ledger.templateId,
      },
    );
    const res = (await lastValueFrom(templateObservable)).data;
    this.logger.log(res, '报销模版详情');
    if (res.errcode !== 0) {
      throw new ServiceHttpException(
        ServiceCodeEnum.ENTERPRISE_WEIXIN_GET_TEMPLATE_INFO_FAIL,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return res.template_content || {};
  }

  async queryTypeOptions() {
    const info = await this.queryTemplateInfo();
    const result = (info.controls[0].config.selector.options || []).map(
      (item) => item.value[0].text,
    );
    this.logger.debug(result);
    return result;
  }

  /**
   * 查询账单
   * @param starttime -开始时间戳，单位秒
   * @param endtime -结束时间戳，单位秒
   * @param type -类型
   */
  async queryLedger(starttime: string, endtime: string, type?: string) {
    const ledgerList = await this.ledgerRepository.find({
      where: {
        time: Between(
          new Date(Number(starttime + '000')).toISOString().split('T')[0],
          new Date(Number(endtime + '000')).toISOString().split('T')[0],
        ),
        ...(type ? { type } : {}),
        spStatus: Not(7),
      },
      order: {
        time: 'ASC',
      },
    });
    // this.logger.debug(ledgerList[0].id);
    return ledgerList;
  }
}
