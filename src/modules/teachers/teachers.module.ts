import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { MailerModule } from 'src/common/email/email.module';


@Module({
  imports: [MailerModule],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule { }
