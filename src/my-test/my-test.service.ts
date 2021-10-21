import { Injectable, Logger } from '@nestjs/common';
import * as config from 'config';

@Injectable()
export class MyTestService {
  getHello(): string {
    Logger.debug(config.get('test'), 'adf');
    return config.get('test');
  }
}
