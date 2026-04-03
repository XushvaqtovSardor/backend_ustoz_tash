import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { randomUUID } from 'crypto';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
    private readonly logger = new Logger(HttpLoggerInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        const http = context.switchToHttp();
        const req = http.getRequest<Request & { requestId?: string }>();
        const res = http.getResponse<Response>();

        const requestId = req.requestId ?? randomUUID();
        req.requestId = requestId;
        res.setHeader('x-request-id', requestId);

        const startedAt = Date.now();

        return next.handle().pipe(
            tap(() => {
                const ms = Date.now() - startedAt;
                this.logger.log(
                    `${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms reqId=${requestId}`,
                );
            }),
        );
    }
}
