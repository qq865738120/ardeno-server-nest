import { Controller, Get, Request } from '@nestjs/common';
import { PersonalPageService } from './personal-page.service';

@Controller('personal-page')
export class PersonalPageController {
  constructor(private readonly personalPageService: PersonalPageService) {}

  @Get('access')
  async access(@Request() req) {
    return await this.personalPageService.access(req.headers.origin);
  }
}
