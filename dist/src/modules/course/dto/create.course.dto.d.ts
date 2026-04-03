import { CourseLevel } from '@prisma/client';
export declare class CreateCourseDto {
    name: string;
    durationMonth: number;
    durationLesson: number;
    level?: CourseLevel;
    price: string;
    description?: string;
}
