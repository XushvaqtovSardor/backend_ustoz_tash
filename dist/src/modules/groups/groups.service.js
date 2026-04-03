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
exports.GroupsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../database/prisma.service");
let GroupsService = class GroupsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getGroupLessons(groupId, currentUser) {
        const existGroup = await this.prisma.group.findUnique({
            where: {
                id: groupId,
                status: "ACTIVE"
            }
        });
        if (!existGroup) {
            throw new common_1.NotFoundException("Group not found");
        }
        if (currentUser.role == "TEACHER" && existGroup.teacherId != currentUser.id) {
            throw new common_1.ForbiddenException("Bu sening guruhing emas");
        }
        const lessons = await this.prisma.lesson.findMany({
            where: {
                groupId
            }
        });
        return {
            success: true,
            data: lessons
        };
    }
    async getAllGroup() {
        const groups = await this.prisma.group.findMany({
            where: { status: "ACTIVE" }
        });
        return {
            success: true,
            data: groups
        };
    }
    async createGroup(payload, currentUser) {
        const existTeacher = await this.prisma.teacher.findFirst({
            where: {
                id: payload.teacherId,
                status: client_1.Status.ACTIVE
            }
        });
        if (!existTeacher) {
            throw new common_1.NotFoundException("Teacher not found with this id");
        }
        const existCourse = await this.prisma.course.findFirst({
            where: {
                id: payload.courseId,
                status: client_1.Status.ACTIVE
            },
            select: {
                durationLesson: true
            }
        });
        if (!existCourse) {
            throw new common_1.NotFoundException("Course not found with this id");
        }
        const existRoom = await this.prisma.room.findFirst({
            where: {
                id: payload.roomId,
                status: client_1.Status.ACTIVE
            }
        });
        if (!existRoom) {
            throw new common_1.NotFoundException("Room not found with this id");
        }
        const existGroup = await this.prisma.group.findUnique({
            where: {
                name: payload.name,
                courseId: payload.courseId
            }
        });
        if (existGroup) {
            throw new common_1.ConflictException("Group already exist with this course");
        }
        function timeToMinutes(time) {
            const [hour, minute] = time.split(':').map(Number);
            return hour * 60 + minute;
        }
        const roomGroups = await this.prisma.group.findMany({
            where: {
                roomId: payload.roomId,
                status: client_1.Status.ACTIVE
            },
            select: {
                startTime: true,
                weekDays: true,
                course: {
                    select: {
                        durationLesson: true
                    }
                }
            }
        });
        let newStartMinute = timeToMinutes(payload.startTime);
        let newEndMinute = timeToMinutes(payload.startTime) + existCourse.durationLesson;
        const roomBusy = roomGroups.every(roomGroup => {
            const { startTime } = roomGroup;
            let startMinute = timeToMinutes(startTime);
            let endMinute = timeToMinutes(startTime) + roomGroup.course.durationLesson;
            return startMinute >= newEndMinute || endMinute <= newStartMinute;
        });
        if (!roomBusy) {
            throw new common_1.BadRequestException("Bu vaqtga hona band");
        }
        await this.prisma.group.create({
            data: {
                ...payload,
                userId: currentUser.id,
                startDate: new Date(payload.startDate)
            }
        });
        return {
            success: true,
            message: "Group created"
        };
    }
};
exports.GroupsService = GroupsService;
exports.GroupsService = GroupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroupsService);
//# sourceMappingURL=groups.service.js.map