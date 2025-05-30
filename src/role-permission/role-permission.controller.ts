import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { AssignRolePermissionDto } from './dtos';
import { Public } from 'src/common/decorators';

@Public()
@Controller('role-permission')
export class RolePermissionController {
    
    
    constructor(private readonly rolePermissionService:RolePermissionService) {}

    @Post('assign-role-permission')
    async assignRolePermission(@Body() assignRolePermissionDto: AssignRolePermissionDto) {
        return this.rolePermissionService.assignRolePermission(assignRolePermissionDto);
    }

    
    @Get('permissionsByRole/:roleId')
    async getPermissionsByRole(@Param('roleId') roleId: string) {
        return this.rolePermissionService.getPermissionsByRole(roleId);
    }

    @Delete('remove-role-permission/:roleId/:permissionId')
    async removeRolePermission(
        @Param('roleId') roleId: string,
        @Param('permissionId') permissionId: string
    ) {
        return this.rolePermissionService.removeRolePermission(roleId, permissionId);
    }

    




}
