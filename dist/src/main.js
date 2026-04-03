"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("./common/config/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }));
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, swagger_2.config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory, {
        swaggerOptions: { persistAuthorization: true }
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map