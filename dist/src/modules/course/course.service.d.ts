import { PrismaService } from 'src/database/prisma.service';
import { CreateCourseDto } from './dto/create.course.dto';
export declare class CourseService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllCourse(): Promise<{
        success: boolean;
        data: {
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            id: number;
            name: string;
            description: string | null;
            durationMonth: number;
            durationLesson: number;
            level: import("@prisma/client").$Enums.CourseLevel | null;
            price: import("@prisma/client-runtime-utils").Decimal;
        }[];
    }>;
    createCourse(payload: CreateCourseDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
