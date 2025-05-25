import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateActionDto } from './dtos';
import { ActionsService } from './actions.service';
import { Public } from 'src/common/decorators';
import { UpdateActionDto } from './dtos/update-action.dto';

@Public()
@Controller('actions')
export class ActionsController {

    constructor(
        private readonly actionsService: ActionsService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createActionDto: CreateActionDto) {
        return this.actionsService.createAction(createActionDto);
    }

    @Get()
    getAll() {
        return this.actionsService.getActions();
    }
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getById(@Param('id', ParseUUIDPipe) id: string) {
        return this.actionsService.getActionById(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateActionDto: UpdateActionDto,
    ) {
        return this.actionsService.updateAction(id, updateActionDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.actionsService.deleteAction(id);
    }

}
