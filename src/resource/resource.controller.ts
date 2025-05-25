import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dtos';
import { Public } from 'src/common/decorators';

@Public()
@Controller('resource')
export class ResourceController {


constructor(private readonly resourcceService:ResourceService) {}


    @Post()
    createResource(@Body() createResourceDto:CreateResourceDto) {
        return this.resourcceService.createResource(createResourceDto);
    }

    @Get()
    getAllResources() {
        return this.resourcceService.getAllResources();
    }

    @Get(':id')
    getResourceById(@Param('id', ParseUUIDPipe) id:string) {
        return this.resourcceService.getResourceById(id);
    }

    @Put(':id')
    updateResource(@Param('id', ParseUUIDPipe) id:string, @Body() createResourceDto:CreateResourceDto) {
        return this.resourcceService.updateResource(id, createResourceDto);
    }

    @Delete(':id')
    deleteResource(@Param('id', ParseUUIDPipe) id:string) {
        return this.resourcceService.deleteResource(id);
    }   

}
