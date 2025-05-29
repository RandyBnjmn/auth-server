import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from './dtos';
import { Public } from 'src/common/decorators';

@Public()
@Controller('role')

export class RoleController {

    constructor(private readonly roleService:RoleService) {}

    @Post()
    async createRole(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.createRole(createRoleDto);
    }

    @Get()
    async getRoles() {
        return this.roleService.getRoles();
    }

    @Get(':id')
    async getRoleById(@Param('id') id: string) {
        return this.roleService.getRoleById(id);
    }

    //getUserswithRole
    @Get('get-users-with-role/:roleId')
    async getUsersWithRole(@Param('roleId') roleId: string) {
        return this.roleService.getUsersWithRole(roleId);
    }

    @Put(':id')
    async updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return this.roleService.updateRole(id, updateRoleDto);
    }

    @Delete(':id')
    async deleteRole(@Param('id') id: string) {
        return this.roleService.deleteRole(id);
    }
}
