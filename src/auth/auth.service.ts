import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dtos';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

    async signup(authDto: AuthDto): Promise<Tokens> {

        const hashedPassword = await this.hashPassword(authDto.password);


        const newUser = await this.prisma.user.create({
            data: {
                email: authDto.email,
                password: hashedPassword
            },
        });

        const tokens = await this.getTopkens(newUser.id, newUser.email);
        await this.updateRtHash(newUser.id, tokens.refresh_token);

        return tokens;

    }


    async signin(authDto:AuthDto): Promise<Tokens> {

        const user = await this.prisma.user.findUnique({
            where: {
                email: authDto.email,
            },
        });
        if(!user){
            throw new ForbiddenException('Access Denied');
        }
        const passwordMatches = await bcrypt.compare(authDto.password, user.password);
        if(!passwordMatches){
            throw new ForbiddenException('Access Denied');
        }
        const tokens = await this.getTopkens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
   
   
    }


    async logout(userId:string) {
        const user = await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRt:{
                    not: null,
                }
            },
            data: {
                hashedRt: null,
            },
        });

        return user;
    }

    async refreshTokens( userId: string, refreshToken: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if(!user){
            throw new ForbiddenException('Access Denied');
        }

        const rtMatches = await bcrypt.compare(refreshToken, user.hashedRt!);

        if(!rtMatches){
            throw new ForbiddenException('Access Denied');
        }
        const tokens = await this.getTopkens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;

    }

    async updateRtHash(userId: string, refreshToken: string) {
        const hash = await bcrypt.hash(refreshToken, 10);

        const user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hash,
            },
        });

        return user;
    }


    private async hashPassword(password: string): Promise<string> {

        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    private async getTopkens(userId: string, email: string) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                expiresIn: '15m',
                secret: 'at-secret',
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                expiresIn: '7d',
                secret: 'rt-secret',
            }),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
        };


    }

}
