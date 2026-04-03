
import { Injectable, NotFoundException } from '@nestjs/common';
import { hashPassword } from 'src/common/config/bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTeacherDto } from './dto/create.teacher.dto';
import { UpdateTeacherDto } from './dto/update.teacher.dto';
import { MailerService } from 'src/common/email/email.service';

@Injectable()
export class TeachersService {
    constructor(
            private prisma: PrismaService,
            private mailerService: MailerService
        ) { }
    
        async createTeacher(payload: CreateTeacherDto, filename: string) {
            await this.prisma.teacher.create({
                data: {
                    ...payload,
                    password: await hashPassword(payload.password),
                    photo: filename ?? null
                }
            })
    
            await this.mailerService.sendEmail(payload.email, payload.email, payload.password)
    
            return {
                success: true,
                message: "Teacher successfully created"
            }
        }
    
        async getAllTeachers() {
            const Teachers = await this.prisma.teacher.findMany();
    
            return {
                success: true,
                data: Teachers
            }
        }
    
        async getOneTeacher(id: number) {
            const Teacher = await this.prisma.teacher.findUnique({ where: { id } });
            if (!Teacher) {
                throw new NotFoundException("Teacher is Not found");
            }
    
            return {
                success: true,
                data: Teacher
            }
        }
    
        async updateTeacher(id: number, payload: UpdateTeacherDto) {
            const Teacher = await this.prisma.teacher.findUnique({ where: { id } });
            if (!Teacher) {
                throw new NotFoundException("Teacher is Not found");
            }
            await this.prisma.teacher.update({ where: { id }, data: payload });
    
            return {
                success: true,
                message: "Teacher updated successfully"
            }
        }
    
        async deleteTeacher(id: number){
            const Teacher = await this.prisma.teacher.findUnique({ where: { id } });
            if (!Teacher) {
                throw new NotFoundException("Teacher is Not found");
            }
            await this.prisma.teacher.delete({where: {id}});   
        }
}
