import { FilesService } from './files.service';
import { Response } from 'express';
export declare class FilesController {
    private filesService;
    constructor(filesService: FilesService);
    createFile(file: Express.Multer.File, body: {
        userId: string;
        title: string;
    }): Promise<{
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
    updateFile(id: string, body: {
        title: string;
    }): Promise<{
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
    deleteFile(id: string): Promise<{
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
    getFilesByUser(userId: string): Promise<{
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
    downloadFile(fileName: string, res: Response): Promise<void>;
}
