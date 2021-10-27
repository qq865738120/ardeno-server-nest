import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ServiceHttpException } from '../exceptions/service-http-exception';
import { ResponseManager } from '../managers/response.manager';

@Catch(ServiceHttpException)
export class ServiceHttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const code = exception.getCode();
    const status = exception.getStatus();
    response.code(status).send(new ResponseManager(code, '').getResponse());
  }
}
