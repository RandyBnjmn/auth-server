import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({global:true}),
    AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
