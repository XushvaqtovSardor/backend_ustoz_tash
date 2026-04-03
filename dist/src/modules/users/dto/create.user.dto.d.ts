import { Role } from "@prisma/client";
export declare class CreateUserDto {
    fullName: string;
    email: string;
    password: string;
    position: string;
    hire_date: string;
    role: Role;
    address?: string;
}
