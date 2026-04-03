"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.config = new swagger_1.DocumentBuilder()
    .setTitle('N25 crm')
    .setDescription("O'qi")
    .addBearerAuth()
    .build();
//# sourceMappingURL=swagger.js.map