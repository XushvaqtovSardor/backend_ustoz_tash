"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("./common/config/swagger");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const http_logger_interceptor_1 = require("./common/interceptors/http-logger.interceptor");
const crypto_1 = require("crypto");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');
    app.use((req, res, next) => {
        const requestId = (0, crypto_1.randomUUID)();
        req.requestId = requestId;
        res.setHeader('x-request-id', requestId);
        next();
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        stopAtFirstError: true,
    }));
    app.useGlobalInterceptors(new http_logger_interceptor_1.HttpLoggerInterceptor());
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, swagger_2.config);
    swagger_1.SwaggerModule.setup('api/docs', app, documentFactory, {
        customSiteTitle: 'Backend API Docs',
        swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true,
            filter: true,
            tryItOutEnabled: true,
        }
    });
    const expressApp = app.getHttpAdapter().getInstance();
    expressApp.get('/api-json', (_req, res) => {
        res.redirect('/api/docs-json');
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map