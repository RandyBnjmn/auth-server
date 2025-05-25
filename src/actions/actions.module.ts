import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ActionsService],
  controllers: [ActionsController],
  imports: [PrismaModule],
  
  
})
export class ActionsModule {}
