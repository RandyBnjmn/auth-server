import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AtStrategy, RtStrategy } from './strategies';
import { BcrypHashingService } from 'src/common/services';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy,{
    provide: 'IHashingService',
    useClass: BcrypHashingService, // Assuming you have a BcryptService that implements IHashingService
  }],
  imports: [PrismaModule],
  exports:[
    'IHashingService',
  ]
})
export class AuthModule {}
