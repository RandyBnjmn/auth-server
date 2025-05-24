
import * as joi from 'joi';
import 'dotenv/config'

interface IEnv {
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_EXPIRES_IN: string;


}

const envSchema = joi.object<IEnv>({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
    JWT_REFRESH_EXPIRES_IN: joi.string().required(),


}).unknown(true);

const { error, value } = envSchema.validate(
    {
        ...process.env,
        PORT: process.env.PORT,
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
        JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,


    }
);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: IEnv = value;

export const env = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
    jwtSecret: envVars.JWT_SECRET,
    jwtRefreshSecret: envVars.JWT_REFRESH_SECRET,
    jwtExpiresIn: envVars.JWT_EXPIRES_IN,
    jwtRefreshExpiresIn: envVars.JWT_REFRESH_EXPIRES_IN,


}