import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {


    constructor(private readonly prismaService: PrismaService) { }

    async createRole(createRoleDto: CreateRoleDto) {


        const existingRole = await this.prismaService.role.findUnique({
            where: {
                name: createRoleDto.name
            }
        });
        if (existingRole) {
            throw new ConflictException(`Role with name ${createRoleDto.name} already exists`);
        }

        const newRole = await this.prismaService.role.create({
            data: {
                ...createRoleDto
            }
        });
        return newRole;

    }

    async getRoles() {
        return await this.prismaService.role.findMany();
    }


    async getRoleById(id: string) {

        const role = await this.prismaService.role.findUnique({
            where: {
                id
            }
        });
        if (!role) {
            throw new ConflictException(`Role with id ${id} not found`);
        }
        return role;
    }

    async updateRole(id: string, updateRoleDto: UpdateRoleDto) {

        const role = await this.getRoleById(id);

        if (updateRoleDto.name && updateRoleDto.name !== role.name) {
            const existingRole = await this.prismaService.role.findUnique({
                where: {
                    name: updateRoleDto.name
                }
            });
            if (existingRole) {
                throw new ConflictException(`Role with name ${updateRoleDto.name} already exists`);
            }
        }

        const data: Record<string, any> = {}
        if (updateRoleDto.name != undefined) data.name = updateRoleDto.name;
        if (updateRoleDto.description != undefined) data.description = updateRoleDto.description;
        
        return await this.prismaService.role.update({
            where: {
                id
            },
            data: {
                ...data
            }
        });


    }

    async deleteRole(id: string) {

        await this.getRoleById(id);

        return await this.prismaService.role.update({
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
