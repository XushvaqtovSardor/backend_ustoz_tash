"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const path_1 = require("path");
let FilesService = class FilesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createFile(userId, title, file) {
        if (!file) {
            throw new common_1.BadRequestException("File is required");
        }
        const supportedExtensions = ['.mp4', '.webm', '.mpeg', '.avi', '.mkv', '.m4v', '.ogm', '.mov', '.mpg'];
        const fileExtension = (0, path_1.extname)(file.originalname).toLowerCase();
        if (!supportedExtensions.includes(fileExtension)) {
            throw new common_1.BadRequestException("Unsupported file format");
        }
        const fileSizeMB = Math.ceil(file.size / (1024 * 1024));
        const fileName = `${Date.now()}${fileExtension}`;
        const uploadPath = path.join(process.cwd(), 'src', 'uploads', 'videos');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
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
        };
    }
    async updateFile(fileId, title) {
        const file = await this.prisma.file.findUnique({ where: { id: fileId } });
        if (!file) {
            throw new common_1.NotFoundException("File not found");
        }
        const updatedFile = await this.prisma.file.update({
            where: { id: fileId },
            data: { title }
        });
        return {
            success: true,
            message: "File updated successfully",
            data: updatedFile
        };
    }
    async deleteFile(fileId) {
        const file = await this.prisma.file.findUnique({ where: { id: fileId } });
        if (!file) {
            throw new common_1.NotFoundException("File not found");
        }
        const filePath = path.join(process.cwd(), 'src', 'uploads', 'videos', file.file_name);
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error(`Error deleting file: ${errorMessage}`);
        }
        await this.prisma.file.delete({ where: { id: fileId } });
        return {
            success: true,
            message: "File deleted successfully"
        };
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
        };
    }
    async getFilesByUser(userId) {
        const files = await this.prisma.file.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' }
        });
        return {
            success: true,
            data: files
        };
    }
    async downloadFile(fileName) {
        const filePath = path.join(process.cwd(), 'src', 'uploads', 'videos', fileName);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException("File not found");
        }
        return filePath;
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FilesService);
//# sourceMappingURL=files.service.js.map