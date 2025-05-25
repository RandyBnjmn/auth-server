import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreatePermissionDto {


    @IsString()
    @IsUUID()
    @IsNotEmpty()
    resourceId: string;

    @IsString()
    @IsUUID()
    @IsNotEmpty()
    actionId: string;
}