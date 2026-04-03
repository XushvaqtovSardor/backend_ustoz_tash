import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
declare class RegisterDto {
    email: string;
    password: string;
    fullName: string;
}
declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthController {
    private readonly userService;
    constructor(userService: UsersService);
    register(body: RegisterDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            email: string;
            fullName: string;
            photo: string | null;
            accessToken: any;
            refreshToken: any;
        };
    }>;
    login(body: LoginDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            email: string;
            fullName: string;
            photo: string | null;
            accessToken: any;
            refreshToken: any;
        };
    }>;
}
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
            role: import(".prisma/client").$Enums.Role;
            address: string | null;
            photo: string | null;
            status: import(".prisma/client").$Enums.UserStatus;
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
            role: import(".prisma/client").$Enums.Role;
            address: string | null;
            photo: string | null;
            status: import(".prisma/client").$Enums.UserStatus;
            created_at: Date;
            updated_at: Date;
            id: number;
        };
    }>;
    updateUser(id: string, payload: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteUser(id: string): Promise<void>;
}
export {};
