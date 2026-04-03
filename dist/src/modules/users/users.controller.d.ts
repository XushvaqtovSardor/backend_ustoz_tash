import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    createUser(payload: CreateUserDto, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllUser(): Promise<{
        success: boolean;
        data: {
            fullName: string;
            email: string;
            password: string;
            position: string;
            hire_date: Date;
            role: import("@prisma/client").$Enums.Role;
            address: string | null;
            photo: string | null;
            status: import("@prisma/client").$Enums.UserStatus;
            created_at: Date;
            updated_at: Date;
            id: number;
        }[];
    }>;
    getOneUser(id: string): Promise<{
        success: boolean;
        data: {
            fullName: string;
            email: string;
            password: string;
            position: string;
            hire_date: Date;
            role: import("@prisma/client").$Enums.Role;
            address: string | null;
            photo: string | null;
            status: import("@prisma/client").$Enums.UserStatus;
            created_at: Date;
            updated_at: Date;
            id: number;
        };
    }>;
    updateUser(id: string, payload: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteUser(id: string): void;
}
