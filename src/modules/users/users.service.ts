import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { hashPassword, comparePassword } from 'src/common/config/bcrypt';
import { MailerService } from 'src/common/email/email.service';
import { UpdateUserDto } from './dto/update.user.dto';
import jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private mailerService: MailerService
    ) { }

    async createUser(payload: CreateUserDto, filename: string) {
        await this.prisma.user.create({
            data: {
                ...payload,
                password: await hashPassword(payload.password),
                hire_date: new Date(payload.hire_date),
                photo: filename ?? null
            }
        })

        await this.mailerService.sendEmail(payload.email, payload.email, payload.password)

        return {
            success: true,
            message: "User successfully created"
        }
    }

    async getAllUsers() {
        const users = await this.prisma.user.findMany();

        return {
            success: true,
            data: users
        }
    }

    async getOneUser(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException("User is Not found");
        }

        return {
            success: true,
            data: user
        }
    }

    async updateUser(id: number, payload: UpdateUserDto) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException("User is Not found");
        }
        await this.prisma.user.update({ where: { id }, data: payload });

        return {
            success: true,
            message: "User updated successfully"
        }
    }

    async deleteUser(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException("User is Not found");
        }
        await this.prisma.user.delete({ where: { id } });
    }

    async register(email: string, password: string, fullName: string, photo?: string) {
        const existUser = await this.prisma.user.findUnique({ where: { email } });
        if (existUser) {
            throw new ConflictException("User already exists");
        }

        const newUser = await this.prisma.user.create({
            data: {
                email,
                fullName,
                password: await hashPassword(password),
                photo: photo ?? null,
                position: "User",
                hire_date: new Date(),
                role: "STUDENT"
            }
        });

        const accessToken = jwt.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { id: newUser.id, email: newUser.email },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        return {
            success: true,
            message: "User registered successfully",
            data: {
                id: newUser.id,
                email: newUser.email,
                fullName: newUser.fullName,
                photo: newUser.photo,
                accessToken,
                refreshToken
            }
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new NotFoundException("Email or password incorrect");
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new NotFoundException("Email or password incorrect");
        }

        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '1d' }
        );

        return {
            success: true,
            message: "User logged in successfully",
            data: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                photo: user.photo,
                accessToken,
                refreshToken
            }
        }
    }
}
