import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
export declare class LessonsController {
    private readonly lessonServise;
    constructor(lessonServise: LessonsService);
    createStudentGroup(payload: CreateLessonDto, req: Request): Promise<void>;
}
