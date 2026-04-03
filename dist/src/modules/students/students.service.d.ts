import { PrismaService } from 'src/database/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { MailerService } from 'src/common/email/email.service';
export declare class StudentsService {
    private prisma;
    private mailerService;
    constructor(prisma: PrismaService, mailerService: MailerService);
    createStudent(payload: CreateStudentDto, filename: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllStudents(): Promise<{
        success: boolean;
        data: {
            fullName: string;
            email: string;
            password: string;
            photo: string | null;
            status: import("@prisma/client").$Enums.UserStatus;
            created_at: Date;
            updated_at: Date;
            id: number;
            birth_date: Date;
        }[];
    }>;
    getOneStudent(id: number): Promise<{
        success: boolean;
        data: {
            fullName: string;
            email: string;
            password: string;
            photo: string | null;
            status: import("@prisma/client").$Enums.UserStatus;
            created_at: Date;
            updated_at: Date;
            id: number;
            birth_date: Date;
        };
    }>;
    updateStudent(id: number, payload: UpdateStudentDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteStudent(id: number): Promise<void>;
}
