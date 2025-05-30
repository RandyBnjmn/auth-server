import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserPermissionService } from './user-permission.service';
import { CreateUserPermissionDto } from './dtos';
import { Public } from 'src/common/decorators';

@Public()
@Controller('user-permission')

export class UserPermissionController {

    constructor(private readonly userPermissionService:UserPermissionService) {}

    @Post()
    async createUserPermission(@Body() createUserPermissionDto: CreateUserPermissionDto) {
        return this.userPermissionService.createUserPermission(createUserPermissionDto);
    }

    @Get(':userId')
    async getUserPermissions(@Param('userId', ParseUUIDPipe) userId: string) {
        return this.userPermissionService.getUserPermissions(userId);
    }

    @Get('/hasPermission/:userId/:permissionId')
    async hasPermissions(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Param('permissionId', ParseUUIDPipe) permissionId: string
    ) {
        return this.userPermissionService.hasPermissions(userId, permissionId);
    }

    @Get('/usersWithPermission/:permissionId')
    async getUsersWithPermission(
        @Param('permissionId', ParseUUIDPipe) permissionId: string
    ) {
        return this.userPermissionService.getUsersWithPermission(permissionId);
    }










}
