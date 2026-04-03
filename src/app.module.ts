import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { ConfigModule } from "@nestjs/config"
import { UsersModule } from './modules/users/users.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { MailerModule } from './common/email/email.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserSeeder } from './database/seed/user.seeder';
import { StudentsModule } from './modules/students/students.module';
import { CourseModule } from './modules/course/course.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { GroupsModule } from './modules/groups/groups.module';
import { LessonsModule } from './modules/lessons/lessons.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal:true
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
    TeachersModule,
    MailerModule,
    StudentsModule,
    CourseModule,
    RoomsModule,
    GroupsModule,
    LessonsModule
  ],
  providers:[UserSeeder]
})
export class AppModule {}
