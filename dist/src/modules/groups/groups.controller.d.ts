import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create.group.dto';
export declare class GroupsController {
    private readonly groupService;
    constructor(groupService: GroupsService);
    getGroupLessons(groupId: number, req: Request): Promise<{
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
    createGroup(payload: CreateGroupDto, req: Request): Promise<{
        success: boolean;
        message: string;
    }>;
}
