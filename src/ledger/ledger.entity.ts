import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('ledger')
export class LedgerEntity {
  // @PrimaryGeneratedColumn('uuid')
  // id: number;

  /**
   * 审批单号，使用企业微信生成的id编号
   */
  @PrimaryColumn()
  id: string;

  /**
   * 审批状态，1-审批中；2-已通过；3-已驳回；4-已撤销；6-通过后撤销；7-已删除；10-已支付
   */
  @Column('int')
  spStatus: number;

  /**
   * 审批类型
   */
  @Column()
  type: string;

  /**
   * 审批原由
   */
  @Column()
  reason: string;

  /**
   * 费用类型
   */
  @Column()
  costType: string;

  /**
   * 发生时间
   */
  @Column('date')
  time: string;

  /**
   * 费用金额
   */
  @Column('money')
  costAmount: number;

  /**
   * 费用说明
   */
  @Column()
  costDescription: string;

  /**
   * 附件
   */
  @Column({ default: null })
  attachment: string;
}
