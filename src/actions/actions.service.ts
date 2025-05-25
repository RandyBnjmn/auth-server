import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActionDto } from './dtos';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateActionDto } from './dtos/update-action.dto';

@Injectable()
export class ActionsService {


    constructor(private readonly prismaService: PrismaService) { }

    async createAction(createActionDto: CreateActionDto) {

        const newAction = await this.prismaService.action.create({
            data: {
                ...createActionDto
            }
        });

        return newAction;

    }
    async getActions() {

        const actions = await this.prismaService.action.findMany();
        console.log(actions);
        return actions;

    }

    async getActionById(id: string) {

        const action = await this.prismaService.action.findUnique({
            where: {
                id
            }
        });

        if (!action) {
            throw new NotFoundException(`Action with id ${id} not found`);
        }

        return action;

    }

    async updateAction(id: string, dto: UpdateActionDto) {

        const existing = await this.getActionById(id);

        console.log('name', dto.name);
        console.log('existing', existing.name);
        if (dto.name && dto.name !== existing.name) {

            const nameTaken = await this.prismaService.action.findUnique({
                where: {
                    name: dto.name,
                    NOT: { id },
                },
            });


            if (nameTaken) {
                throw new ConflictException(`Action with name ${dto.name} already exists`);
            }
        }

        const data: Record<string, any> = {};
        data.id = id;
        if (dto.name !== undefined) data.name = dto.name;
        if (dto.description !== undefined) data.description = dto.description;

        return this.prismaService.action.update({
            where: { id },
            data,
        });
    }

    async deleteAction(id: string):Promise<boolean> {

        await this.getActionById(id);

        await this.prismaService.action.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                isDeleted: true,
            },
        })

        return true;

    }



}
