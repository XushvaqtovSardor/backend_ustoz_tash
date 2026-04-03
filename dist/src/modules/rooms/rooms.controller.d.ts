import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create.room.dto';
export declare class RoomsController {
    private readonly roomService;
    constructor(roomService: RoomsService);
    getAllRoom(): Promise<{
        success: boolean;
        data: {
            status: import("@prisma/client").$Enums.Status;
            created_at: Date;
            updated_at: Date;
            id: number;
            name: string;
            capacity: number;
        }[];
    }>;
    createRoom(payload: CreateRoomDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
