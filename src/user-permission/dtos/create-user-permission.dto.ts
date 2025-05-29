import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateUserPermissionDto {

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    userId: string;
    
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    permissionId: string;
}