import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    private readonly logger = new Logger(PrismaService.name);
    constructor() {
        super();
        this.setupMiddlewares();
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    private filterAuditFields(item: Record<string, any>, fieldsToRemove: string[]) {
        const clean = { ...item };
        for (const field of fieldsToRemove) {
            delete clean[field];
        }
        return clean;
    }

    private async setupMiddlewares() {

        this.logger.log('Setting up Prisma middlewares...');

        this.$use(async (params, next) => {
            if (params.action === 'findMany' || params.action === 'findUnique') {
                // Validar que args exista
                if (!params.args) {
                    params.args = {};
                }

                // Validar que where exista
                if (!params.args.where) {
                    params.args.where = {};
                }

                // Agregar el filtro de soft delete
                params.args.where.isDeleted = false;
            }

            return next(params);
        });

        this.$use(async (params, next) => {
            const result = await next(params);

            const actionsToFilter = [
                'findUnique',
                'findFirst',
                'findMany',
                'create',
                'createMany',
                'update',
                'updateMany',
            ];

            const auditFields = ['createdAt', 'updatedAt', 'deletedAt', 'isDeleted'];

            // Si la acción no es de lectura, no se modifica nada
            if (!actionsToFilter.includes(params.action)) {
                return result;
            }

            // Si el resultado es un arreglo (ej. findMany)
            if (Array.isArray(result)) {
                return result.map(item => this.filterAuditFields(item, auditFields));
            }

            // Si es objeto único
            if (typeof result === 'object' && result !== null) {
                return this.filterAuditFields(result, auditFields);
            }

            return result;
        });


    }





}
