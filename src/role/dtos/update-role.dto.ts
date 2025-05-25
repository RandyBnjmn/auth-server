import { PartialType } from "@nestjs/mapped-types";
import { CreateRoleDto } from ".";

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
}