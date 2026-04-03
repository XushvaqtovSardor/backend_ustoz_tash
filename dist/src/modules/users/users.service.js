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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const bcrypt_1 = require("../../common/config/bcrypt");
const email_service_1 = require("../../common/email/email.service");
let UsersService = class UsersService {
    prisma;
    mailerService;
    constructor(prisma, mailerService) {
        this.prisma = prisma;
        this.mailerService = mailerService;
    }
    async createUser(payload, filename) {
        await this.prisma.user.create({
            data: {
                ...payload,
                password: await (0, bcrypt_1.hashPassword)(payload.password),
                hire_date: new Date(payload.hire_date),
                photo: filename ?? null
            }
        });
        await this.mailerService.sendEmail(payload.email, payload.email, payload.password);
        return {
            success: true,
            message: "User successfully created"
        };
    }
    async getAllUsers() {
        const users = await this.prisma.user.findMany();
        return {
            success: true,
            data: users
        };
    }
    async getOneUser(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException("User is Not found");
        }
        return {
            success: true,
            data: user
        };
    }
    async updateUser(id, payload) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException("User is Not found");
        }
        await this.prisma.user.update({ where: { id }, data: payload });
        return {
            success: true,
            message: "User updated successfully"
        };
    }
    async deleteUser(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException("User is Not found");
        }
        await this.prisma.user.delete({ where: { id } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.MailerService])
], UsersService);
//# sourceMappingURL=users.service.js.map