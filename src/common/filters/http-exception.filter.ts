import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ResponseStatusEnum } from '../enums/response-status.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response.code(status).send({
      code: status,
      data: null,
      message: exception.getResponse().message,
      status: ResponseStatusEnum.ERROR,
    });
  }
}
