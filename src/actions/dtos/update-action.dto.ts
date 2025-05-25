import { CreateActionDto } from "./create-action.dto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateActionDto extends PartialType(CreateActionDto) {
 
}