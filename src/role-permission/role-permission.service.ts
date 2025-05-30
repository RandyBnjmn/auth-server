import { Injectable } from '@nestjs/common';
import { AssignRolePermissionDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolePermissionService {


    constructor(private readonly PrismaService: PrismaService) { }


    async getPermissionsByRole(roleId: string) {

        const permissions = await this.PrismaService.rolePermission.findMany({
            where: {
                roleId: roleId
            },
            include: {
                permission: {
                    select: {
                        id: true,
                        resource: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        action: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return permissions
            .filter(permission => permission.permission !== undefined && permission.permission !== null)
            .map(permission => ({
                id: permission.permissionId,
                name: this.mapPermissionName(permission.permission),
                resource: {
                    id: permission.permission.resource.id,
                    name: permission.permission.resource.name
                },
                action: {
                    id: permission.permission.action.id,
                    name: permission.permission.action.name
                }
            }));

    }

    async assignRolePermission(assignRolePermissionDto: AssignRolePermissionDto) {

        const newRolePermission = await this.PrismaService.rolePermission.create({
            data: {
                roleId: assignRolePermissionDto.roleId,
                permissionId: assignRolePermissionDto.permissionId
            },  
        });
        return {
            roleId: newRolePermission.roleId,
            permissionId: newRolePermission.permissionId
        };

    }
    async removeRolePermission(roleId: string, permissionId: string) {
        const deletedRolePermission = await this.PrismaService.rolePermission.update({
            where: {
                roleId_permissionId: {
                    roleId: roleId,
                    permissionId: permissionId
                }
            },
            data:{
                isDeleted: true,
                deletedAt: new Date()
            }
        });

        return {
            roleId: deletedRolePermission.roleId,
            permissionId: deletedRolePermission.permissionId
        };
    }

    private mapPermissionName(permission: { id: string; resource: { id: string; name: string; }; action: { id: string; name: string; }; }): any {
        return `${permission.resource.name}:${permission.action.name}`;
    }
}
