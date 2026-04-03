import { PrismaService } from 'src/database/prisma.service';
import { CreateTeacherDto } from './dto/create.teacher.dto';
import { UpdateTeacherDto } from './dto/update.teacher.dto';
import { MailerService } from 'src/common/email/email.service';
export declare class TeachersService {
    private prisma;
    private mailerService;
    constructor(prisma: PrismaService, mailerService: MailerService);
    createTeacher(payload: CreateTeacherDto, filename: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllTeachers(): Promise<{
        success: boolean;
        data: {
            fullName: string;
            email: string;
            password: string;
            position: string;
            photo: string | null;
            status: import("@prisma/client").$Enums.UserStatus;
            created_at: Date;
            updated_at: Date;
            id: number;
            experience: number;
        }[];
    }>;
    getOneTeacher(id: number): Promise<{
        success: boolean;
        data: {
            fullName: string;
            email: string;
            password: string;
            position: string;
            photo: string | null;
            status: import("@prisma/client").$Enums.UserStatus;
            created_at: Date;
            updated_at: Date;
            id: number;
            experience: number;
        };
    }>;
    updateTeacher(id: number, payload: UpdateTeacherDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteTeacher(id: number): Promise<void>;
}
