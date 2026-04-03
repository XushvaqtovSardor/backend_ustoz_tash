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
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("../../common/config/bcrypt");
const prisma_service_1 = require("../../database/prisma.service");
const email_service_1 = require("../../common/email/email.service");
let TeachersService = class TeachersService {
    prisma;
    mailerService;
    constructor(prisma, mailerService) {
        this.prisma = prisma;
        this.mailerService = mailerService;
    }
    async createTeacher(payload, filename) {
        await this.prisma.teacher.create({
            data: {
                ...payload,
                password: await (0, bcrypt_1.hashPassword)(payload.password),
                photo: filename ?? null
            }
        });
        await this.mailerService.sendEmail(payload.email, payload.email, payload.password);
        return {
            success: true,
            message: "Teacher successfully created"
        };
    }
    async getAllTeachers() {
        const Teachers = await this.prisma.teacher.findMany();
        return {
            success: true,
            data: Teachers
        };
    }
    async getOneTeacher(id) {
        const Teacher = await this.prisma.teacher.findUnique({ where: { id } });
        if (!Teacher) {
            throw new common_1.NotFoundException("Teacher is Not found");
        }
        return {
            success: true,
            data: Teacher
        };
    }
    async updateTeacher(id, payload) {
        const Teacher = await this.prisma.teacher.findUnique({ where: { id } });
        if (!Teacher) {
            throw new common_1.NotFoundException("Teacher is Not found");
        }
        await this.prisma.teacher.update({ where: { id }, data: payload });
        return {
            success: true,
            message: "Teacher updated successfully"
        };
    }
    async deleteTeacher(id) {
        const Teacher = await this.prisma.teacher.findUnique({ where: { id } });
        if (!Teacher) {
            throw new common_1.NotFoundException("Teacher is Not found");
        }
        await this.prisma.teacher.delete({ where: { id } });
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.MailerService])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map