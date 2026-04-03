"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./database/prisma.module");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./modules/users/users.module");
const teachers_module_1 = require("./modules/teachers/teachers.module");
const email_module_1 = require("./common/email/email.module");
const auth_module_1 = require("./modules/auth/auth.module");
const user_seeder_1 = require("./database/seed/user.seeder");
const students_module_1 = require("./modules/students/students.module");
const course_module_1 = require("./modules/course/course.module");
const rooms_module_1 = require("./modules/rooms/rooms.module");
const groups_module_1 = require("./modules/groups/groups.module");
const lessons_module_1 = require("./modules/lessons/lessons.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            teachers_module_1.TeachersModule,
            email_module_1.MailerModule,
            students_module_1.StudentsModule,
            course_module_1.CourseModule,
            rooms_module_1.RoomsModule,
            groups_module_1.GroupsModule,
            lessons_module_1.LessonsModule
        ],
        providers: [user_seeder_1.UserSeeder]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map