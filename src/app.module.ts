import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AtGuard } from './common/guards';
import { ActionsModule } from './actions/actions.module';
import { ResourceModule } from './resource/resource.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';


@Module({
  imports: [
    JwtModule.register({global:true}),
    AuthModule, PrismaModule, ActionsModule, ResourceModule, PermissionModule, RoleModule],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AtGuard,
    },
    
  ],
})
export class AppModule {}
