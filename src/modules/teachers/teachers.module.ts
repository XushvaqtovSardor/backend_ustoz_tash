import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { PrismaService } from 'src/database/prisma.service';
import { MailerService } from 'src/common/email/email.service';


@Module({
  controllers: [TeachersController],
  providers: [TeachersService, PrismaService,MailerService]
})
export class TeachersModule {}
