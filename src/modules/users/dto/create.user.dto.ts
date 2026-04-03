import { ApiProperty } from "@nestjs/swagger"
import { Role } from "@prisma/client"
import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator"


export class CreateUserDto {
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
    @IsDateString()
    hire_date: string

    @ApiProperty()
    @IsString()
    @IsEnum(Role)
    role: Role

    @ApiProperty()
    @IsOptional()
    @IsString()
    address?: string
}