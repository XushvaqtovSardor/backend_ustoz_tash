import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailerService {
    async sendEmail(to: string, username: string, password: string): Promise<void> {
        Logger.log(`Mail stub -> to:${to} username:${username} password:${password}`);
    }
}
