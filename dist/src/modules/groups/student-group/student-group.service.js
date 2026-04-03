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
exports.StudentGroupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma.service");
const client_1 = require("@prisma/client");
let StudentGroupService = class StudentGroupService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createStudentGroup(payload, currentUser) {
        const groupStudentsCount = await this.prisma.studentGroup.count({
            where: {
                groupId: payload.groupId
            }
        });
        const existGroup = await this.prisma.group.findUnique({
            where: { id: payload.groupId, status: client_1.Status.ACTIVE },
            select: {
                room: {
                    select: {
                        capacity: true
                    }
                }
            }
        });
        if (!existGroup) {
            throw new common_1.NotFoundException("Group not found with this id");
        }
        const existStudent = await this.prisma.student.findUnique({
            where: { id: payload.studentId, status: client_1.Status.ACTIVE }
        });
        if (!existStudent) {
            throw new common_1.NotFoundException("Student not found with this id");
        }
        if (groupStudentsCount >= existGroup.room.capacity) {
            throw new common_1.BadRequestException("Group limit to'lgan");
        }
        await this.prisma.studentGroup.create({
            data: {
                ...payload,
                userId: currentUser.id
            }
        });
        return {
            success: true,
            message: "Student added group"
        };
    }
};
exports.StudentGroupService = StudentGroupService;
exports.StudentGroupService = StudentGroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentGroupService);
//# sourceMappingURL=student-group.service.js.map