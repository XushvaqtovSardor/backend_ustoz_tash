import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { ConfigModule } from "@nestjs/config"
import { UsersModule } from './modules/users/users.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { MailerModule } from './common/email/email.module';
import { UserSeeder } from './database/seed/user.seeder';
import { RoomsModule } from './modules/rooms/rooms.module';
import { GroupsModule } from './modules/groups/groups.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    UsersModule,
    TeachersModule,
    MailerModule,
    RoomsModule,
    GroupsModule
  ],
  providers: [UserSeeder]
})
export class AppModule { }
