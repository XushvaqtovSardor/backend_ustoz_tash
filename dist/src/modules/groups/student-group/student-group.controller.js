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
exports.StudentGroupController = void 0;
const common_1 = require("@nestjs/common");
const student_group_service_1 = require("./student-group.service");
const create_studentgroup_dto_1 = require("./dto/create.studentgroup.dto");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles-guard");
const roles_1 = require("../../../common/decorators/roles");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
let StudentGroupController = class StudentGroupController {
    constructor(studentGroupServise) {
        this.studentGroupServise = studentGroupServise;
    }
    createStudentGroup(payload, req) {
        return this.studentGroupServise.createStudentGroup(payload, req["user"]);
    }
};
exports.StudentGroupController = StudentGroupController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: `${client_1.Role.SUPERADMIN}, ${client_1.Role.ADMIN}`
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_1.Roles)("ADMIN", "SUPERADMIN"),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_studentgroup_dto_1.CreateStudentGroupDto, Object]),
    __metadata("design:returntype", void 0)
], StudentGroupController.prototype, "createStudentGroup", null);
exports.StudentGroupController = StudentGroupController = __decorate([
    (0, common_1.Controller)('student-group'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [student_group_service_1.StudentGroupService])
], StudentGroupController);
//# sourceMappingURL=student-group.controller.js.map