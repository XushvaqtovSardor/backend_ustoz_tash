import { ApiProperty } from "@nestjs/swagger"
import { Role } from "@prisma/client"
import { Type } from "class-transformer"
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator"


export class CreateTeacherDto {
    @ApiProperty()
    @IsString()
    fullName: string

    @ApiProperty()
    @IsString()
    email: string   

    @ApiProperty()
    @IsString()
    password: string

    @ApiProperty()
    @IsString()
    position: string


    @ApiProperty()
    @IsNumber()
    @Type(()=> Number)
    experience: number

}