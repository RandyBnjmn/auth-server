import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    roleId: string;

   
}