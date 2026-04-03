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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const create_course_dto_1 = require("./dto/create.course.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles-guard");
const client_1 = require("@prisma/client");
const roles_1 = require("../../common/decorators/roles");
const swagger_1 = require("@nestjs/swagger");
let CourseController = class CourseController {
    courseService;
    constructor(courseService) {
        this.courseService = courseService;
    }
    getAllCourse() {
        return this.courseService.getAllCourse();
    }
    createCourse(payload) {
        return this.courseService.createCourse(payload);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN),
    (0, common_1.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "getAllCourse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_dto_1.CreateCourseDto]),
    __metadata("design:returntype", void 0)
], CourseController.prototype, "createCourse", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('course'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map