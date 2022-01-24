import { IpAddress } from '@/common/decorator/ip-address-decorator';
import { Controller, Get, Request } from '@nestjs/common';
import { PersonalPageService } from './personal-page.service';

@Controller('personal-page')
export class PersonalPageController {
  constructor(private readonly personalPageService: PersonalPageService) {}

  @Get('access')
  async access(@IpAddress() clinetIp: string) {
    return await this.personalPageService.access(clinetIp);
  }
}
