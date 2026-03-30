import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE } from './response-message.decorator';

type ResponseData<T> = {
  data?: T;
  meta?: Record<string, unknown>;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{
    status: boolean;
    message: string;
    data: T;
    meta?: Record<string, unknown>;
  }> {
    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) ||
      'Success';

    return next.handle().pipe(
      map((res: T | ResponseData<T>) => {
        if (
          typeof res === 'object' &&
          res !== null &&
          ('data' in res || 'meta' in res)
        ) {
          const resData = res;
          return {
            status: true,
            message,
            data: resData.data,
            meta: resData.meta,
          };
        }

        return {
          status: true,
          message,
          data: res as T,
        };
      }),
    ) as Observable<{
      status: boolean;
      message: string;
      data: T;
      meta?: Record<string, unknown>;
    }>;
  }
}
