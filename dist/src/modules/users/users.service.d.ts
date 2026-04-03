import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { MailerService } from '../../common/email/email.service';
import { UpdateUserDto } from './dto/update.user.dto';
export declare class UsersService {
    private prisma;
    private mailerService;
    constructor(prisma: PrismaService, mailerService: MailerService);
    createUser(payload: CreateUserDto, filename: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllUsers(): Promise<{
        success: boolean;
        data: {
            fullName: string;
            email: string;
            password: string;
            position: string;
            hire_date: Date;
            role: import(".prisma/client").$Enums.Role;
            address: string | null;
            photo: string | null;
            status: import(".prisma/client").$Enums.UserStatus;
            created_at: Date;
            updated_at: Date;
            id: number;
        }[];
    }>;
    getOneUser(id: number): Promise<{
        success: boolean;
        data: {
            fullName: string;
            email: string;
            password: string;
            position: string;
            hire_date: Date;
            role: import(".prisma/client").$Enums.Role;
            address: string | null;
            photo: string | null;
            status: import(".prisma/client").$Enums.UserStatus;
            created_at: Date;
            updated_at: Date;
            id: number;
        };
    }>;
    updateUser(id: number, payload: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteUser(id: number): Promise<void>;
    register(email: string, password: string, fullName: string, photo?: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            email: string;
            fullName: string;
            photo: string | null;
            accessToken: any;
            refreshToken: any;
        };
    }>;
    login(email: string, password: string): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            email: string;
            fullName: string;
            photo: string | null;
            accessToken: any;
            refreshToken: any;
        };
    }>;
}
