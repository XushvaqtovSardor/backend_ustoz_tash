import { PrismaService } from 'src/database/prisma.service';
import { CreateStudentGroupDto } from './dto/create.studentgroup.dto';
export declare class StudentGroupService {
    private prisma;
    constructor(prisma: PrismaService);
    createStudentGroup(payload: CreateStudentGroupDto, currentUser: {
        id: number;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
