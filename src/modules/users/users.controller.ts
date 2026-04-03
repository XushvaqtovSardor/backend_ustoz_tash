import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/common/guards/roles-guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from 'multer';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UsersService) { }

    @ApiOperation({ summary: 'Register user' })
    @ApiBody({ type: RegisterDto })
    @Post('register')
    async register(@Body() body: RegisterDto) {
        return this.userService.register(body.email, body.password, body.fullName);
    }

    @ApiOperation({ summary: 'Login user' })
    @ApiBody({ type: LoginDto })
    @Post('login')
    async login(@Body() body: LoginDto) {
        return this.userService.login(body.email, body.password);
    }
}

@Controller('users')
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @ApiOperation({
        summary: `${Role.SUPERADMIN}, ${Role.ADMIN}`
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "SUPERADMIN")
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                fullName: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
                role: { type: "string", enum: Object.values(Role) },
                position: { type: "string" },
                hire_date: { type: "string", example: "2026-01-02" },
                photo: { type: "string", format: "binary", nullable: true },
                address: { type: "string", nullable: true },
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
    @Post()
    createUser(
        @Body() payload: CreateUserDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.userService.createUser(payload, file?.filename)
    }

    @Get()
    @UseGuards(AuthGuard)
    getAllUser() {
        return this.userService.getAllUsers()
    }

    @Get(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "SUPERADMIN")
    getOneUser(@Param('id') id: string) {
        return this.userService.getOneUser(+id);
    }

    @Put(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "SUPERADMIN")
    updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto) {
        return this.userService.updateUser(+id, payload);
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "SUPERADMIN")
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(+id)
    }
}
