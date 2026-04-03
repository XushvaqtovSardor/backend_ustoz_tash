"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    constructor() {
        this.logger = new common_1.Logger(AllExceptionsFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionResponse = exception instanceof common_1.HttpException ? exception.getResponse() : null;
        const message = typeof exceptionResponse === 'object' && exceptionResponse !== null
            ? (exceptionResponse.message ??
                'InternalServerError')
            : 'InternalServerError';
        const normalizedMessage = Array.isArray(message)
            ? message.join(', ')
            : String(message);
        const errorName = exception instanceof Error ? exception.name : 'InternalServerError';
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
            body: req.body && typeof req.body === 'object'
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
        }
        else {
            this.logger.warn(JSON.stringify(payload));
        }
        const logDir = (0, path_1.join)(process.cwd(), 'src', 'logs');
        const logPath = (0, path_1.join)(logDir, 'logger.txt');
        (0, fs_1.mkdirSync)(logDir, { recursive: true });
        (0, fs_1.appendFileSync)(logPath, `${JSON.stringify(payload)}\n`);
        res.status(status).json({
            status,
            message: normalizedMessage,
            name: errorName,
            requestId: req.requestId,
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=all-exceptions.filter.js.map