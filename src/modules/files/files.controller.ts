import { Controller, Post, Get, Put, Delete, Param, Body, UseInterceptors, UploadedFile, UseGuards, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { Response } from 'express';

@Controller('files')
export class FilesController {
    constructor(private filesService: FilesService) { }

    @ApiOperation({ summary: 'Create file' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'number' },
                title: { type: 'string' },
                file: { type: 'string', format: 'binary' }
            }
        }
    })
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: { userId: string; title: string }
    ) {
        return this.filesService.createFile(parseInt(body.userId), body.title, file);
    }

    @ApiOperation({ summary: 'Update file title' })
    @Put(':id')
    async updateFile(@Param('id') id: string, @Body() body: { title: string }) {
        return this.filesService.updateFile(parseInt(id), body.title);
    }

    @ApiOperation({ summary: 'Delete file' })
    @Delete(':id')
    async deleteFile(@Param('id') id: string) {
        return this.filesService.deleteFile(parseInt(id));
    }

    @ApiOperation({ summary: 'Get all files' })
    @Get('all')
    async getAllFiles() {
        return this.filesService.getAllFiles();
    }

    @ApiOperation({ summary: 'Get files by user' })
    @Get('oneUser/:userId')
    async getFilesByUser(@Param('userId') userId: string) {
        return this.filesService.getFilesByUser(parseInt(userId));
    }

    @ApiOperation({ summary: 'Download file' })
    @Get('file/download/:fileName')
    async downloadFile(@Param('fileName') fileName: string, @Res() res: Response) {
        const filePath = await this.filesService.downloadFile(fileName);
        return res.download(filePath);
    }
}
