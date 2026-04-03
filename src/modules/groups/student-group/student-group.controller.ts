import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { StudentGroupService } from './student-group.service';
import { CreateStudentGroupDto } from './dto/create.studentgroup.dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles-guard';
import { Roles } from 'src/common/decorators/roles';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from '@prisma/client';

@Controller('student-group')
@ApiBearerAuth()
export class StudentGroupController {
    constructor(private readonly studentGroupServise : StudentGroupService){}

    @ApiOperation({
        summary:`${Role.SUPERADMIN}, ${Role.ADMIN}`
    })
    @UseGuards(AuthGuard,RolesGuard)
    @Roles("ADMIN","SUPERADMIN")
    @Post()
    createStudentGroup(
        @Body() payload : CreateStudentGroupDto,
        @Req() req : Request
    ){
        return this.studentGroupServise.createStudentGroup(payload, req["user"])
    }
}
