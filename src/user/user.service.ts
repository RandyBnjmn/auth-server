import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AssignRoleDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

    constructor(private readonly prismaService: PrismaService) { }

    async assignRoleToUser(assignRoleDto: AssignRoleDto) {

        const userDb = await this.getUserById(assignRoleDto.userId);

        //validate if users role is already the same as the one being assigned
        if (userDb.roleId === assignRoleDto.roleId) {
            throw new ConflictException(`User with ID ${assignRoleDto.userId} already has the role with ID ${assignRoleDto.roleId}`);
        }
        //Update user with new role
        const updatedUser = await this.prismaService.user.update({
            where: {
                id: assignRoleDto.userId
            },
            data: {
                roleId: assignRoleDto.roleId
            },
            
            include: {
                
                role: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                    }
                }
            }
        });

        return {
            userId: updatedUser.id,
            email: updatedUser.email,
            role: {
                id: updatedUser.role?.id,
                name: updatedUser.role?.name,
                description: updatedUser.role?.description
            }
        };
    }

    async getUserById(userId: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: userId
            },
            include: {
                role: true,
            }
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        return user;
    }
}
