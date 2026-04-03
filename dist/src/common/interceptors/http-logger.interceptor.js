"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HttpLoggerInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpLoggerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const crypto_1 = require("crypto");
let HttpLoggerInterceptor = HttpLoggerInterceptor_1 = class HttpLoggerInterceptor {
    constructor() {
        this.logger = new common_1.Logger(HttpLoggerInterceptor_1.name);
    }
    intercept(context, next) {
        const http = context.switchToHttp();
        const req = http.getRequest();
        const res = http.getResponse();
        const requestId = req.requestId ?? (0, crypto_1.randomUUID)();
        req.requestId = requestId;
        res.setHeader('x-request-id', requestId);
        const startedAt = Date.now();
        return next.handle().pipe((0, rxjs_1.tap)(() => {
            const ms = Date.now() - startedAt;
            this.logger.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms reqId=${requestId}`);
        }));
    }
};
exports.HttpLoggerInterceptor = HttpLoggerInterceptor;
exports.HttpLoggerInterceptor = HttpLoggerInterceptor = HttpLoggerInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], HttpLoggerInterceptor);
//# sourceMappingURL=http-logger.interceptor.js.map