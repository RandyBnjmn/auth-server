import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionService {


    constructor(private readonly prismaService: PrismaService) { }

    async createPermission(createPermissionDto: CreatePermissionDto) {

        const existingPermission = await this.prismaService.permission.findUnique({
            where: {
                resourceId_actionId: {
                    resourceId: createPermissionDto.resourceId,
                    actionId: createPermissionDto.actionId
                }
            }
        });

        if (existingPermission) {
            throw new ConflictException(`Permission with resourceId ${createPermissionDto.resourceId} and actionId ${createPermissionDto.actionId} already exists`);
        }

        const newPermission = await this.prismaService.permission.create({
            data: {
                ...createPermissionDto
            }
        });

        return newPermission;
    }


    async getPermissions() {

        return await this.prismaService.permission.findMany({
            include: {
                resource: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                action: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
            }
        });

    }


    async getPermissionsById(id: string) {
        const permission = await this.prismaService.permission.findUnique({
            where: {
                id
            },
            include: {
                resource: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                action: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
            }
        });
        if (!permission) {
            throw new ConflictException(`Permission with id ${id} not found`);
        }
        return permission;
    }

    async updatePermission(id: string, dto: CreatePermissionDto) {
        const current = await this.getPermissionsById(id);

        const updatedResourceId = dto.resourceId ?? current.resourceId;
        const updatedActionId = dto.actionId ?? current.actionId;

        const hasChanged =
            updatedResourceId !== current.resourceId || updatedActionId !== current.actionId;

        if (hasChanged) {
            const existing = await this.prismaService.permission.findUnique({
                where: {
                    resourceId_actionId: {
                        resourceId: updatedResourceId,
                        actionId: updatedActionId,
                    },
                },
            });

            if (existing) {
                throw new ConflictException(
                    `Permission with resourceId '${updatedResourceId}' and actionId '${updatedActionId}' already exists`
                );
            }
        }

        return this.prismaService.permission.update({
            where: { id },
            data: {
                resourceId: dto.resourceId,
                actionId: dto.actionId,
            },
        });
    }


    async deletePermission(id: string) {

        await this.getPermissionsById(id);

        return await this.prismaService.permission.update({
            where: {
                id
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()

            }
        });

    }
}
