"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
class PrismaService extends client_1.PrismaClient {
    constructor() {
        let connectionString = process.env.DATABASE_URL;
        let pool = new pg_1.Pool({ connectionString });
        let adapter = new adapter_pg_1.PrismaPg(pool);
        super({ adapter, log: ["error", "warn"] });
    }
    async onModuleInit() {
        await this.$connect();
        common_1.Logger.log("✅ Prisma connected");
    }
    async onModuleDestroy() {
        await this.$disconnect();
        common_1.Logger.log("❌ Prisma disconnected");
    }
}
exports.PrismaService = PrismaService;
//# sourceMappingURL=prisma.service.js.map