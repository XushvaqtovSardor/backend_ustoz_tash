import { WeekDays } from '@prisma/client';
export declare class CreateGroupDto {
    teacherId: number;
    roomId: number;
    courseId: number;
    name: string;
    startDate: Date;
    startTime: string;
    weekDays: WeekDays[];
}
