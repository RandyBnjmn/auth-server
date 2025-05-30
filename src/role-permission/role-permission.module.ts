import { Module } from '@nestjs/common';
import { RolePermissionController } from './role-permission.controller';
import { RolePermissionService } from './role-permission.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
  imports: [PrismaModule],
})
export class RolePermissionModule { }
