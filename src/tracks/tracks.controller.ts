import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new track' })
  @ApiResponse({
    status: 201,
    description: 'Track created successfully',
    type: TrackEntity,
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of tracks',
    type: [TrackEntity],
  })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a track by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Track ID' })
  @ApiResponse({
    status: 200,
    description: 'Track found successfully',
    type: TrackEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  findOne(@Param('id') id: string) {
    return this.tracksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a track by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Track ID' })
  @ApiResponse({
    status: 200,
    description: 'Track updated successfully',
    type: TrackEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a track by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Track ID' })
  @ApiResponse({
    status: 200,
    description: 'Track deleted successfully',
    type: TrackEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found',
  })
  remove(@Param('id') id: string) {
    return this.tracksService.remove(id);
  }
}
