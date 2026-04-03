import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { extname } from 'path';

@Injectable()
export class FilesService {
    constructor(private prisma: PrismaService) { }

    async createFile(userId: number, title: string, file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException("File is required");
        }

        const supportedExtensions = ['.mp4', '.webm', '.mpeg', '.avi', '.mkv', '.m4v', '.ogm', '.mov', '.mpg'];
        const fileExtension = extname(file.originalname).toLowerCase();

        if (!supportedExtensions.includes(fileExtension)) {
            throw new BadRequestException("Unsupported file format");
        }

        const fileSizeMB = Math.ceil(file.size / (1024 * 1024));

        const fileName = `${Date.now()}${fileExtension}`;
        const uploadPath = path.join(process.cwd(), 'src', 'uploads', 'videos');

        // Ensure upload directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        // Save file
        fs.writeFileSync(path.join(uploadPath, fileName), file.buffer);

        const uploadedFile = await this.prisma.file.create({
            data: {
                title,
                file_name: fileName,
                size: fileSizeMB,
                user_id: userId
            }
        });

        return {
            success: true,
            message: "File uploaded successfully",
            data: uploadedFile
        }
    }

    async updateFile(fileId: number, title: string) {
        const file = await this.prisma.file.findUnique({ where: { id: fileId } });
        if (!file) {
            throw new NotFoundException("File not found");
        }

        const updatedFile = await this.prisma.file.update({
            where: { id: fileId },
            data: { title }
        });

        return {
            success: true,
            message: "File updated successfully",
            data: updatedFile
        }
    }

    async deleteFile(fileId: number) {
        const file = await this.prisma.file.findUnique({ where: { id: fileId } });
        if (!file) {
            throw new NotFoundException("File not found");
        }

        // Delete file from disk
        const filePath = path.join(process.cwd(), 'src', 'uploads', 'videos', file.file_name);
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error(`Error deleting file: ${errorMessage}`);
        }

        await this.prisma.file.delete({ where: { id: fileId } });

        return {
            success: true,
            message: "File deleted successfully"
        }
    }

    async getAllFiles() {
        const files = await this.prisma.file.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        photo: true
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        });

        return {
            success: true,
            data: files
        }
    }

    async getFilesByUser(userId: number) {
        const files = await this.prisma.file.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' }
        });

        return {
            success: true,
            data: files
        }
    }

    async downloadFile(fileName: string) {
        const filePath = path.join(process.cwd(), 'src', 'uploads', 'videos', fileName);

        if (!fs.existsSync(filePath)) {
            throw new NotFoundException("File not found");
        }

        return filePath;
    }
}
