import { Module } from '@nestjs/common';
import { UsersController, AuthController } from './users.controller';
import { UsersService } from './users.service';
import { MailerModule } from 'src/common/email/email.module';

@Module({
  imports: [MailerModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService]
})
export class UsersModule { }
