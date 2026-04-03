"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.config = new swagger_1.DocumentBuilder()
    .setTitle('Backend Ustoz Tash API')
    .setDescription('NestJS + Prisma API documentation')
    .setVersion('1.0.0')
    .addServer('http://localhost:3000', 'Local')
    .addServer('https://backend-ustoz-tash.onrender.com', 'Render')
    .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    in: 'header',
    name: 'Authorization',
    description: 'Access token: Bearer <token>',
}, 'access-token')
    .addTag('users')
    .addTag('teachers')
    .addTag('rooms')
    .addTag('groups')
    .build();
//# sourceMappingURL=swagger.js.map