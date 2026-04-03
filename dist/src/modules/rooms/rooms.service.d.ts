import { CreateRoomDto } from './dto/create.room.dto';
import { PrismaService } from '../../database/prisma.service';
export declare class RoomsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllRoom(): Promise<{
        success: boolean;
        data: {
            status: import(".prisma/client").$Enums.Status;
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
