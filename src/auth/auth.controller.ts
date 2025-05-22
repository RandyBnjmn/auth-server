import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService) {}

    
    @Post('signup')
    signUp(@Body() authDto :AuthDto): Promise<Tokens>{
        return this.authService.signup(authDto);
    }

    @Post('signin')
    login() {
        this.authService.signin();
    }
    
    @Post('logout')
    logout() {
        return this.authService.logout();
    }

    @Post('refresh')
    refresh() {
        return this.authService.refresh();
    }
}
