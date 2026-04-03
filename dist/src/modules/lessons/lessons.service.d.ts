import { PrismaService } from 'src/database/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Role } from '@prisma/client';
export declare class LessonsService {
    private prisma;
    constructor(prisma: PrismaService);
    createLesson(payload: CreateLessonDto, currentUser: {
        id: number;
        role: Role;
    }): Promise<void>;
}
