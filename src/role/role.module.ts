import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [PrismaModule],
})
export class RoleModule {}
