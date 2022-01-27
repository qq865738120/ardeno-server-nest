import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

import * as requestIp from 'request-ip';

export const IpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    Logger.log(req.headers, '---------req.headers-------');
    Logger.log(req.clientIp, '---------req.clientIp-------');
    Logger.log(req.ip, '---------req.ip-------');
    Logger.log(req.ips, '---------req.ips-------');
    if (req.clientIp) return req.clientIp;
    return requestIp.getClientIp(req);
  },
);
