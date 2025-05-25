import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateResourceDto {

    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsOptional()
    description?:string

}