import { Injectable } from '@nestjs/common';
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


    signin() {
        throw new Error('Method not implemented.');
    }


    logout() {
        return 'logout';
    }

    refresh() {
        return 'refresh';
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
