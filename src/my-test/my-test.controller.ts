import { Controller, Get } from '@nestjs/common';
import { MyTestService } from './my-test.service';

@Controller()
export class MyTestController {
  constructor(private readonly myTestService: MyTestService) {}

  @Get('my-test')
  getHello(): string {
    return this.myTestService.getHello();
  }
}
