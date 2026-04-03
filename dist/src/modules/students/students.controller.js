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
exports.StudentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles-guard");
const roles_1 = require("../../common/decorators/roles");
const students_service_1 = require("./students.service");
const create_student_dto_1 = require("./dto/create-student.dto");
let StudentsController = class StudentsController {
    studentsService;
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    createStudent(payload, file) {
        return this.studentsService.createStudent(payload, file.filename);
    }
    getAllStudent() {
        return this.studentsService.getAllStudents();
    }
    getOneStudent(id) {
        return this.studentsService.getOneStudent(+id);
    }
};
exports.StudentsController = StudentsController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: `${client_1.Role.SUPERADMIN}, ${client_1.Role.ADMIN}`
    }),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                fullName: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
                birth_date: { type: "string", example: "2026-01-02" },
                photo: { type: "string", format: "binary", nullable: true },
            }
        }
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo', {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads",
            filename: (req, file, cb) => {
                const filename = Date.now() + "." + file.originalname;
                cb(null, filename);
            }
        })
    })),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto, Object]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "createStudent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_1.Roles)(client_1.Role.ADMIN, client_1.Role.SUPERADMIN),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "getAllStudent", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "getOneStudent", null);
exports.StudentsController = StudentsController = __decorate([
    (0, common_1.Controller)('students'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
//# sourceMappingURL=students.controller.js.map