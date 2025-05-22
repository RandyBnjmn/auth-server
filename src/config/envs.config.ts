
import * as joi from 'joi';
import 'dotenv/config'

interface IEnv {
    PORT: number;
    JWT_SECRET: string;
    DATABASE_URL: string;

}

const envSchema = joi.object<IEnv>({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),
    DATABASE_URL: joi.string().required(),

}).unknown(true);

const { error, value } = envSchema.validate(
    {
        ...process.env,
        PORT: process.env.PORT,
        JWT_SECRET: process.env.JWT_SECRET,
        DATABASE_URL: process.env.DATABASE_URL,


    }
);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: IEnv = value;

export const env = {
    port: envVars.PORT,
    jwtSecret: envVars.JWT_SECRET,
    databaseUrl: envVars.DATABASE_URL,

}