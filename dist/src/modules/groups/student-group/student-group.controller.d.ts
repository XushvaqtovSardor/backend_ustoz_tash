import { StudentGroupService } from './student-group.service';
import { CreateStudentGroupDto } from './dto/create.studentgroup.dto';
export declare class StudentGroupController {
    private readonly studentGroupServise;
    constructor(studentGroupServise: StudentGroupService);
    createStudentGroup(payload: CreateStudentGroupDto, req: Request): Promise<{
        success: boolean;
        message: string;
    }>;
}
