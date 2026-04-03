import { MailerService as NestMailerService } from "@nestjs-modules/mailer";
export declare class MailerService {
    private mailerService;
    constructor(mailerService: NestMailerService);
    sendEmail(email: string, login: string, password: string): Promise<void>;
}
