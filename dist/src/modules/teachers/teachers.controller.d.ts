import { TeachersService } from './teachers.service';
import { UpdateTeacherDto } from './dto/update.teacher.dto';
import { CreateTeacherDto } from './dto/create.teacher.dto';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    createTeacher(payload: CreateTeacherDto, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllTeacher(): Promise<{
        success: boolean;
        data: {
            fullName: string;
            email: string;
            password: string;
            position: string;
            photo: string | null;
            status: import(".prisma/client").$Enums.UserStatus;
            created_at: Date;
            updated_at: Date;
            id: number;
            experience: number;
        }[];
    }>;
    getOneTeacher(id: string): Promise<{
        success: boolean;
        data: {
            fullName: string;
            email: string;
            password: string;
            position: string;
            photo: string | null;
            status: import(".prisma/client").$Enums.UserStatus;
            created_at: Date;
            updated_at: Date;
            id: number;
            experience: number;
        };
    }>;
    updateTeacher(id: string, payload: UpdateTeacherDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteTeacher(id: string): Promise<void>;
}
