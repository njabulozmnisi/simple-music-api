import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PlaylistEntity } from './entities/playlist.entity';
import { AddTrackToPlaylistDto } from './dto/add-track-to-playlist.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new playlist' })
  @ApiResponse({
    status: 201,
    description: 'Playlist created successfully',
    type: PlaylistEntity,
  })
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all playlists' })
  @ApiResponse({
    status: 200,
    description: 'List of playlists',
    type: [PlaylistEntity],
  })
  findAll() {
    return this.playlistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a playlist by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    description: 'Playlist found',
    type: PlaylistEntity,
  })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  findOne(@Param('id') id: string) {
    return this.playlistsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a playlist by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    description: 'Playlist updated successfully',
    type: PlaylistEntity,
  })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return this.playlistsService.update(id, updatePlaylistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a playlist by ID' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    description: 'Playlist deleted successfully',
    type: PlaylistEntity,
  })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  remove(@Param('id') id: string) {
    return this.playlistsService.remove(id);
  }

  @Post(':id/tracks')
  @ApiOperation({ summary: 'Add track to playlist' })
  @ApiResponse({ status: 201, description: 'Track added to playlist' })
  addTrack(@Param('id') id: string, @Body() dto: AddTrackToPlaylistDto) {
    return this.playlistsService.addTrack(id, dto);
  }

  @Delete(':id/tracks/:trackId')
  @ApiOperation({ summary: 'Remove a track from playlist' })
  @ApiParam({ name: 'id' })
  @ApiParam({ name: 'trackId' })
  @ApiResponse({ status: 200, description: 'Track removed from playlist' })
  removeTrack(@Param('id') id: string, @Param('trackId') trackId: string) {
    return this.playlistsService.removeTrack(id, trackId);
  }
}
