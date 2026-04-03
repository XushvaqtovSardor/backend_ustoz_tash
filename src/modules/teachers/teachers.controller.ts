import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create.user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { Role, Status } from '@prisma/client';
import { TeachersService } from './teachers.service';
import { UpdateTeacherDto } from './dto/update.teacher.dto';
import { CreateTeacherDto } from './dto/create.teacher.dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles-guard';
import { Roles } from 'src/common/decorators/roles';


@Controller('teachers')
@ApiBearerAuth()
export class TeachersController {
    constructor(private readonly teachersService: TeachersService) { }
    @ApiOperation({
        summary: `${Role.SUPERADMIN}, ${Role.ADMIN}`
    })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                fullName: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
                position: { type: "string" },
                experience: { type: "number", example: 4 },
                photo: { type: "string", format: "binary", nullable: true },
            }
        }
    })
    @UseInterceptors(FileInterceptor('photo', {
        storage: diskStorage({
            destination: "./uploads",
            filename: (req, file, cb) => {
                const filename = Date.now() + "." + file.originalname
                cb(null, filename)
            }
        })
    }))
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    @Post()
    createTeacher(
        @Body() payload: CreateTeacherDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.teachersService.createTeacher(payload, file.filename)
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    @Get('all')
    getAllTeacher() {
        return this.teachersService.getAllTeachers()
    }

    @Get(':id')
    getOneTeacher(@Param('id') id: string) {
        return this.teachersService.getOneTeacher(+id);
    }

    @Put()
    updateTeacher(@Param('id') id: string, @Body() payload: UpdateTeacherDto) {
        return this.teachersService.updateTeacher(+id, payload);
    }

    @Delete()
    deleteTeacher(@Param('id') id: string) {

    }
}
