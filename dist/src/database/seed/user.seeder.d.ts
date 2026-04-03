import { OnModuleInit } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
export declare class UserSeeder implements OnModuleInit {
    private prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
}
