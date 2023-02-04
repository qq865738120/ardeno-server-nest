import { IpAddress } from '@/common/decorator/ip-address-decorator';
import { Controller, Get, Param, Query, Request } from '@nestjs/common';
import { LedgerService } from './ledger.service';

@Controller('ledger')
export class LedgerController {
  constructor(private readonly ledgerService: LedgerService) {}

  @Get('type')
  async queryType(@Request() req) {
    // return await this.ledgerService.access(req.headers['user-agent']);
    // this.ledgerService.queryNoList('1672300835', '1674291828');
    // const info = await this.ledgerService.queryNoInfo('202301130002');
    // this.ledgerService.saveNoInfo(info);
    // this.ledgerService.updateNoList('1672300835', '1674291828');
    // this.ledgerService.queryLedger('1673300835', '1673857350', '孙苑媛开支');
    return this.ledgerService.queryTypeOptions();
  }

  @Get('query')
  async queryLedger(
    @Query('starttime') starttime,
    @Query('endtime') endtime,
    @Query('type') type,
  ) {
    // return await this.ledgerService.access(req.headers['user-agent']);
    // this.ledgerService.queryNoList('1673300835', '1673600835');
    // const info = await this.ledgerService.queryNoInfo('202301130002');
    // this.ledgerService.saveNoInfo(info);
    // this.ledgerService.updateNoList('1673300835', '1673857350');
    console.log('req', starttime, endtime, type);

    return this.ledgerService.queryLedger(starttime, endtime, type);
  }
}
