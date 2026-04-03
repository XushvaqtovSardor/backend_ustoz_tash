import { PrismaService } from 'src/database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    private generateToken;
    login(payload: LoginDto): Promise<{
        success: boolean;
        accessToken: string;
    }>;
    loginTeacher(payload: LoginDto): Promise<{
        success: boolean;
        accessToken: string;
    }>;
    loginStudent(payload: LoginDto): Promise<{
        success: boolean;
        accessToken: string;
    }>;
}
