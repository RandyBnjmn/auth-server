import { Injectable } from '@nestjs/common';
import { CreateUserPermissionDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserPermissionService {

    constructor(private readonly prismaService: PrismaService) { }

    async createUserPermission(createUserPermissionDto: CreateUserPermissionDto) {

        const newUserPermission = await this.prismaService.userPermission.create({
            data: {
                ...createUserPermissionDto
            },
        });

        return {
            userId: newUserPermission.userId,
            permissionId: newUserPermission.permissionId
        };

    }

    async getUsersWithPermission(permissionId: string) {

        const users = await this.prismaService.userPermission.findMany({
            where: {
                permissionId: permissionId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true
                    }
                },
                permission: {
                    select: {
                        id: true,

                    },
                    include: {
                        resource: {
                            select: {
                                id: true,
                                name: true
                            },

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

        this.logger.log(`Fetched users with permissionId: ${permissionId}`, JSON.stringify(users));
        return users.map(user => ({
            userId: user.user.id,
            email: user.user.email,
            permissionId: user.permission.id,
            resourceId: user.permission.resource.id,
            resourceName: user.permission.resource.name,
            actionId: user.permission.action.id,
            actionName: user.permission.action.name
        }));



    }


    async hasPermissions(userId: string, permissionId: string) {
        throw new Error('Method not implemented.');
    }


    async getUserPermissions(userId: string) {
        throw new Error('Method not implemented.');
    }



}
