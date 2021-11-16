import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    Logger.log(request.url, 'request url');
    Logger.log(request.method, 'request method');
    if (request.method == 'GET' || request.method == 'DELETE') {
      Logger.log(request.query, 'request params');
    } else {
      Logger.log(request.body, 'request params');
    }
    return next.handle().pipe(
      tap((data) => {
        Logger.log(data, 'response data');
      }),
    );
  }
}
