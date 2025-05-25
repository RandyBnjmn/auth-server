import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { Public } from 'src/common/decorators';

@Public()
@Controller('permission')
export class PermissionController {

    constructor(private readonly permissionService: PermissionService) {
    }


    @Post()
    async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionService.createPermission(createPermissionDto);
    }

    @Get()
    async getPermissions() {
        return this.permissionService.getPermissions();
    }

    @Get(':id')
    async getPermissionById(@Param('id') id: string) {
        return this.permissionService.getPermissionsById(id);
    }

    @Put(':id')
    async updatePermission(@Param('id') id: string, @Body() updatePermissionDto: CreatePermissionDto) {
        return this.permissionService.updatePermission(id, updatePermissionDto);
    }

    @Delete(':id')
    async deletePermission(@Param('id') id: string) {
        return this.permissionService.deletePermission(id);
    }







}
