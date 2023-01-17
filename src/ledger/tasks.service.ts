import tools from '@/common/utils/tools';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { LedgerService } from './ledger.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly ledgerService: LedgerService) {}

  /**
   * 同步账单，每小时执行一次
   */
  @Cron('0 0 0/1 * * *')
  asyncLedger() {
    this.logger.log('更新审批列表', '定时任务');
    const timeInterval = 2 * 60 * 60;
    const starttime = tools.unixTime() - timeInterval;
    const endtime = tools.unixTime();
    this.ledgerService.updateNoList(starttime + '', endtime + '');
  }
}
