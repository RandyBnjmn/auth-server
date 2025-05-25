import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResourceService {

    constructor(private readonly prismaService: PrismaService) { }

    async createResource(createResourceDto: CreateResourceDto) {

        //VALIDATE IF RESOURCE NAME ALREADY EXISTS
        const nameTaken = await this.prismaService.resource.findUnique({
            where: {
                name: createResourceDto.name
            }
        });
        if (nameTaken) {
            throw new ConflictException(`Resource with name ${createResourceDto.name} already exists`);
        }

        const newResource = await this.prismaService.resource.create({
            data: {
                ...createResourceDto
            }
        });
        return newResource;
    }

    async getAllResources() {

        return await this.prismaService.resource.findMany();

    }
    async getResourceById(id: string) {

        const resource = await this.prismaService.resource.findUnique({
            where: {
                id
            }
        });
        if (!resource) {
            throw new NotFoundException(`Resource with id ${id} not found`);
        }
        return resource;

    }

    async updateResource(id: string, createResourceDto: CreateResourceDto) {

        //manage if resource name already exists
        const existing = await this.getResourceById(id);

        //verify if resource name already exists
          if (createResourceDto.name && createResourceDto.name !== existing.name) {

            const nameTaken = await this.prismaService.resource.findUnique({
                where: {
                    name: createResourceDto.name,
                    NOT: { id },
                },
            });


            if (nameTaken) {
                throw new ConflictException(`Resource with name ${createResourceDto.name} already exists`);
            }
        }

        const data: Record<string, any> = {};
        if (createResourceDto.name !== undefined) data.name = createResourceDto.name;
        if (createResourceDto.description !== undefined) data.description = createResourceDto.description;

        return await this.prismaService.resource.update({
            where: {id},
            data,
        });


    }

    async deleteResource(id: string) {
        await this.getResourceById(id);
        return await this.prismaService.resource.update({
            where: {
                id
            },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        }
        );
    }
}
