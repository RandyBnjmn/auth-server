import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  imports: [PrismaModule],
})
export class PermissionModule {}
