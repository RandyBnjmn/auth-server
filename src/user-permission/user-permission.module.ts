import { Module } from '@nestjs/common';
import { UserPermissionService } from './user-permission.service';
import { UserPermissionController } from './user-permission.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UserPermissionService],
  controllers: [UserPermissionController],
  imports: [PrismaModule],
})
export class UserPermissionModule {}
