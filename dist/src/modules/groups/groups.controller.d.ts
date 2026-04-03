import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create.group.dto';
export declare class GroupsController {
    private readonly groupService;
    constructor(groupService: GroupsService);
    getGroupLessons(groupId: number, req: any): Promise<{
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
    createGroup(payload: CreateGroupDto, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
