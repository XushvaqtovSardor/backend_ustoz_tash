import { PrismaService } from '../../database/prisma.service';
export declare class FilesService {
    private prisma;
    constructor(prisma: PrismaService);
    createFile(userId: number, title: string, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            created_at: Date;
            updated_at: Date;
            id: number;
            title: string;
            file_name: string;
            size: number;
            user_id: number;
        };
    }>;
    updateFile(fileId: number, title: string): Promise<{
        success: boolean;
        message: string;
        data: {
            created_at: Date;
            updated_at: Date;
            id: number;
            title: string;
            file_name: string;
            size: number;
            user_id: number;
        };
    }>;
    deleteFile(fileId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllFiles(): Promise<{
        success: boolean;
        data: ({
            user: {
                fullName: string;
                photo: string | null;
                id: number;
            };
        } & {
            created_at: Date;
            updated_at: Date;
            id: number;
            title: string;
            file_name: string;
            size: number;
            user_id: number;
        })[];
    }>;
    getFilesByUser(userId: number): Promise<{
        success: boolean;
        data: {
            created_at: Date;
            updated_at: Date;
            id: number;
            title: string;
            file_name: string;
            size: number;
            user_id: number;
        }[];
    }>;
    downloadFile(fileName: string): Promise<string>;
}
