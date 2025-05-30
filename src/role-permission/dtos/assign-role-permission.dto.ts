import { IsNotEmpty, IsUUID } from "class-validator";

export class AssignRolePermissionDto {
    @IsNotEmpty()
    @IsUUID()
    roleId: string;

    @IsNotEmpty()
    @IsUUID()
    permissionId: string;
}