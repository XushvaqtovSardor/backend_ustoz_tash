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
exports.UsersController = exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create.user.dto");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_1 = require("../../common/decorators/roles");
const client_1 = require("@prisma/client");
const roles_guard_1 = require("../../common/guards/roles-guard");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const update_user_dto_1 = require("./dto/update.user.dto");
let AuthController = class AuthController {
    constructor(userService) {
        this.userService = userService;
    }
    async register(body) {
        return this.userService.register(body.email, body.password, body.fullName);
    }
    async login(body) {
        return this.userService.login(body.email, body.password);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Register user' }),
    (0, swagger_1.ApiBody)({ type: register_dto_1.RegisterDto }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Login user' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthController);
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    createUser(payload, file) {
        return this.userService.createUser(payload, file?.filename);
    }
    getAllUser() {
        return this.userService.getAllUsers();
    }
    getOneUser(id) {
        return this.userService.getOneUser(+id);
    }
    updateUser(id, payload) {
        return this.userService.updateUser(+id, payload);
    }
    deleteUser(id) {
        return this.userService.deleteUser(+id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: `${client_1.Role.SUPERADMIN}, ${client_1.Role.ADMIN}`
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_1.Roles)("ADMIN", "SUPERADMIN"),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                fullName: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
                role: { type: "string", enum: Object.values(client_1.Role) },
                position: { type: "string" },
                hire_date: { type: "string", example: "2026-01-02" },
                photo: { type: "string", format: "binary", nullable: true },
                address: { type: "string", nullable: true },
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
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_1.Roles)("ADMIN", "SUPERADMIN"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getOneUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_1.Roles)("ADMIN", "SUPERADMIN"),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_1.Roles)("ADMIN", "SUPERADMIN"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map