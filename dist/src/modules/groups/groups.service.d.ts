import { CreateGroupDto } from './dto/create.group.dto';
import { Role } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
export declare class GroupsService {
    private prisma;
    constructor(prisma: PrismaService);
    getGroupLessons(groupId: number, currentUser: {
        id: number;
        role: Role;
    }): Promise<{
        success: boolean;
        data: {
            created_at: Date;
            updated_at: Date;
            id: number;
            title: string;
            teacherId: number | null;
            userId: number | null;
            groupId: number;
        }[];
    }>;
    getAllGroup(): Promise<{
        success: boolean;
        data: {
            status: import(".prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            id: number;
            name: string;
            teacherId: number;
            roomId: number;
            courseId: number;
            startDate: Date;
            startTime: string;
            weekDays: import(".prisma/client").$Enums.WeekDays[];
            userId: number;
        }[];
    }>;
    createGroup(payload: CreateGroupDto, currentUser: {
        id: number;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
