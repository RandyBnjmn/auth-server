import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dtos';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { env } from 'src/config/envs.config';
import { IHashingService } from 'src/common/interfaces';
@Injectable()
export class AuthService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        @Inject('IHashingService')
        private readonly bcryptServices: IHashingService,
    ) { }

    async signup(authDto: AuthDto): Promise<Tokens> {

        const hashedPassword = await this.hashPassword(authDto.password);


        const newUser = await this.prisma.user.create({
            data: {
                email: authDto.email,
                password: hashedPassword
            },
        });

        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRtHash(newUser.id, tokens.refresh_token);

        return tokens;

    }


    async signin(authDto: AuthDto): Promise<Tokens> {

        const user = await this.prisma.user.findUnique({
            where: {
                email: authDto.email,
            },
        });
        if (!user) {
            throw new ForbiddenException('Access Denied');
        }
        const passwordMatches = await this.bcryptServices.comparePassword(authDto.password, user.password);
        if (!passwordMatches) {
            throw new ForbiddenException('Access Denied');
        }
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;


    }


    async logout(userId: string) {
        const user = await this.prisma.user.updateMany({
            where: {
                id: userId,
                hashedRt: {
                    not: null,
                }
            },
            data: {
                hashedRt: null,
            },
        });

        return user;
    }

    async refreshTokens(userId: string, refreshToken: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new ForbiddenException('Access Denied');
        }

        const rtMatches = await this.bcryptServices.comparePassword(refreshToken, user.hashedRt!);

        if (!rtMatches) {
            throw new ForbiddenException('Access Denied');
        }
        const tokens = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;

    }

    async updateRtHash(userId: string, refreshToken: string) {

        const hash = await this.bcryptServices.hashPassword(refreshToken);

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
        return this.bcryptServices.hashPassword(password);
    }

    private async getTokens(userId: string, email: string) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                expiresIn: env.jwtExpiresIn,
                secret: env.jwtSecret,
            }),
            this.jwtService.signAsync({
                sub: userId,
                email,
            }, {
                expiresIn: env.jwtRefreshExpiresIn,
                secret: env.jwtRefreshSecret,
            }),
        ]);

        return {
            access_token: at,
            refresh_token: rt,
        };


    }

}
