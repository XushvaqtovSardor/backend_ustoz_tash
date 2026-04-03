"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt_1 = require("../../common/config/bcrypt");
let UserSeeder = class UserSeeder {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        const existUser = await this.prisma.user.findFirst({
            where: {
                email: "abdukhoshim99@gmial.com"
            }
        });
        if (!existUser) {
            await this.prisma.user.create({
                data: {
                    fullName: "Abduxoshim",
                    email: "abdukhoshim99@gmial.com",
                    password: await (0, bcrypt_1.hashPassword)("12345678"),
                    role: "SUPERADMIN",
                    position: "Full-Stack",
                    hire_date: new Date("2026-01-01")
                }
            });
            common_1.Logger.log("✅ SuperAdmin created");
        }
        common_1.Logger.log("✅ SuperAdmin already exist");
    }
};
exports.UserSeeder = UserSeeder;
exports.UserSeeder = UserSeeder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserSeeder);
//# sourceMappingURL=user.seeder.js.map