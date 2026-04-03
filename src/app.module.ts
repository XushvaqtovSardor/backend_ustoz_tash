import { Module } from '@nestjs/common';
import { PrismaModule } from './database/prisma.module';
import { ConfigModule } from "@nestjs/config"
import { UsersModule } from './modules/users/users.module';
import { MailerModule } from './common/email/email.module';
import { UserSeeder } from './database/seed/user.seeder';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    UsersModule,
    MailerModule,
    FilesModule
  ],
  providers: [UserSeeder]
})
export class AppModule { }
