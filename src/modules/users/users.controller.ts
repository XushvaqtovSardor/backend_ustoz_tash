import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/common/guards/roles-guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import {FileInterceptor} from "@nestjs/platform-express"
import { diskStorage } from 'multer';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
@Roles("ADMIN", "SUPERADMIN")
@ApiBearerAuth()
export class UsersController {
    constructor(private readonly userService : UsersService){}

    @ApiOperation({
        summary:`${Role.SUPERADMIN}, ${Role.ADMIN}`
    })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema:{
            type:"object",
            properties:{
                fullName:{type:"string"},
                email:{type:"string"},
                password:{type:"string"},
                role:{type:"string",enum:Object.values(Role)},
                position:{type:"string"},
                hire_date:{type:"string",example:"2026-01-02"},
                photo : {type:"string",format:"binary",nullable:true},
                address:{type:"string",nullable:true},
            }
        }
    })
    @UseInterceptors(FileInterceptor('photo',{
        storage:diskStorage({
            destination:"./uploads",
            filename:(req,file,cb) => {
                const filename = Date.now() + "." + file.originalname
                cb(null,filename)
            }
        })
    }))
    @Post()
    createUser(
        @Body() payload : CreateUserDto,
        @UploadedFile() file : Express.Multer.File
    ){
        return this.userService.createUser(payload,file.filename)
    }

    @Get()
    getAllUser(){
        return this.userService.getAllUsers()
    }

    @Get()
    getOneUser(@Param('id') id: string){
        return this.userService.getOneUser(+id);
    }

    @Put()
    updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto){
        return this.userService.updateUser(+id, payload);
    }

    @Delete()
    deleteUser(@Param('id') id: string){

    }
}
