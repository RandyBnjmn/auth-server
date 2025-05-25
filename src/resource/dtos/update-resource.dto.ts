import { PartialType } from "@nestjs/mapped-types";
import { CreateResourceDto } from ".";

export class UpdateRessourceDto extends PartialType(CreateResourceDto) {
}