import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dtos';
import { Tokens } from './types';
import { AtGuard, RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService) {}

    //make public route

    @Public()
    @Post('signup')
    signUp(@Body() authDto :SignupDto): Promise<Tokens>{
        return this.authService.signup(authDto);
    }

    @Public()    
    @Post('signin')
    login(@Body() authDto:AuthDto) : Promise<Tokens>{
        return this.authService.signin(authDto);
    }
    
    @Post('logout')
    logout(@GetCurrentUserId() userId:string) {
        console.log(userId);
        return this.authService.logout(userId);
    }

    @Post('refresh')
    @UseGuards(RtGuard)
    refresh(
        @GetCurrentUser('refreshToken') refreshToken: string,
        @GetCurrentUserId() userId: string,
    ): Promise<Tokens> {
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
