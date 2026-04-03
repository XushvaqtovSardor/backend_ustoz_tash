import { CreateGroupDto } from './dto/create.group.dto';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
export declare class GroupsService {
    private prisma;
    constructor(prisma: PrismaService);
    getGroupLessons(groupId: number, currentUser: {
        id: number;
        role: Role;
    }): Promise<{
        success: boolean;
        data: {
            id: number;
            groupId: number;
            title: string;
            userId: number | null;
            teacherId: number | null;
            created_at: Date;
            updated_at: Date;
        }[];
    }>;
    getAllGroup(): Promise<{
        success: boolean;
        data: {
            id: number;
            userId: number;
            teacherId: number;
            created_at: Date;
            updated_at: Date;
            name: string;
            roomId: number;
            courseId: number;
            startDate: Date;
            startTime: string;
            weekDays: import("@prisma/client").$Enums.WeekDays[];
            status: import("@prisma/client").$Enums.Status;
        }[];
    }>;
    createGroup(payload: CreateGroupDto, currentUser: {
        id: number;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
