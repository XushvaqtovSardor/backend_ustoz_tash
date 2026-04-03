import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles-guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/common/decorators/roles';
import { CreateGroupDto } from './dto/create.group.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('groups')
@ApiBearerAuth()
export class GroupsController {
    constructor(private readonly groupService: GroupsService) { }

    @ApiOperation({
        summary: `${Role.SUPERADMIN}, ${Role.ADMIN}, ${Role.TEACHER}`
    })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN", "SUPERADMIN", "TEACHER")
    @Get("lesson/:groupId")
    getGroupLessons(
        @Param("groupId",ParseIntPipe) groupId : number,
        @Req() req:Request
    ) {
        return this.groupService.getGroupLessons(groupId,req["user"])
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    @Get("all")
    getAllGroup() {
        return this.groupService.getAllGroup()
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPERADMIN)
    @Post()
    createGroup(
        @Body() payload: CreateGroupDto,
        @Req() req: Request
    ) {
        return this.groupService.createGroup(payload, req["user"])
    }
}
