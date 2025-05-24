import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Injectable } from "@nestjs/common";
import { env } from "src/config/envs.config";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    
    
   

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: env.jwtRefreshSecret,
            passReqToCallback: true,
        });
    }
    
    validate(req: Request, payload): any {
        const refreshToken = req.get('authorization')!.replace('Bearer', '').trim();
        return { ...payload, refreshToken };
    }
    
}