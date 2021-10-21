import { Module } from '@nestjs/common';
import { MyTestController } from './my-test.controller';
import { MyTestService } from './my-test.service';

@Module({
  imports: [],
  controllers: [MyTestController],
  providers: [MyTestService],
})
export class MyTestModule {}
