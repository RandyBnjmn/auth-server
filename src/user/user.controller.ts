import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AssignRoleDto } from './dtos';
import { Public } from 'src/common/decorators';


@Public()
@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService) {}

    @Post('assign-role')
    async assignRoleToUser(@Body() assignRoleDto: AssignRoleDto) {
        return this.userService.assignRoleToUser(assignRoleDto);
    }
}
