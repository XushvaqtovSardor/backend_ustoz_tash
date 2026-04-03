import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';
import { MailerService } from 'src/common/email/email.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService,PrismaService,MailerService]
})
export class UsersModule {}
