import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { appendFileSync, mkdirSync } from 'fs';
import { join } from 'path';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request & { requestId?: string }>();
        const res = ctx.getResponse<Response>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse =
            exception instanceof HttpException ? exception.getResponse() : null;

        const message =
            typeof exceptionResponse === 'object' && exceptionResponse !== null
                ? ((exceptionResponse as { message?: string | string[] }).message ??
                    'InternalServerError')
                : 'InternalServerError';

        const normalizedMessage = Array.isArray(message)
            ? message.join(', ')
            : String(message);

        const errorName =
            exception instanceof Error ? exception.name : 'InternalServerError';

        const payload = {
            at: new Date().toISOString(),
            level: status >= 500 ? 'ERROR' : 'WARN',
            requestId: req.requestId,
            method: req.method,
            url: req.originalUrl,
            status,
            name: errorName,
            message: normalizedMessage,
            stack: exception instanceof Error ? exception.stack : null,
            params: req.params,
            query: req.query,
            body:
                req.body && typeof req.body === 'object'
                    ? {
                        ...req.body,
                        ...(req.body.password ? { password: '***' } : {}),
                    }
                    : req.body
                        ? String(req.body)
                        : null,
        };

        if (status >= 500) {
            this.logger.error(JSON.stringify(payload));
        } else {
            this.logger.warn(JSON.stringify(payload));
        }

        const logDir = join(process.cwd(), 'src', 'logs');
        const logPath = join(logDir, 'logger.txt');
        mkdirSync(logDir, { recursive: true });
        appendFileSync(logPath, `${JSON.stringify(payload)}\n`);

        res.status(status).json({
            status,
            message: normalizedMessage,
            name: errorName,
            requestId: req.requestId,
        });
    }
}
