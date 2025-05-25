import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    roleId: string;

   
}