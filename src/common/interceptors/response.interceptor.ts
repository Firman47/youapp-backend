import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ status: boolean; message: string; data: T }> {
    return next.handle().pipe(
      map((data: T) => ({
        status: true,
        message: 'Success',
        data,
      })),
    );
  }
}
