import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    console.log('request', request);
    Logger.log(request.url, 'request url');
    Logger.log(request.method, 'request method');
    if (request.method == 'GET' || request.method == 'DELETE') {
      Logger.log(request.query, 'request params');
    } else {
      Logger.log(request.body, 'request params');
    }
    Logger.log(request.url, 'request url');
    return next.handle().pipe(
      tap((data) => {
        Logger.log(data, 'Controller data');
      }),
    );
  }
}
