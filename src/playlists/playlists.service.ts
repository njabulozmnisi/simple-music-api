import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '../../prisma/generated/prisma';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { AddTrackToPlaylistDto } from './dto/add-track-to-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPlaylistDto: CreatePlaylistDto) {
    const data: Prisma.PlaylistCreateInput = {
      ...createPlaylistDto,
    };

    try {
      return await this.databaseService.playlist.create({ data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `A playlist named "${data.name}" by creator "${data.creator}" already exists.`,
        );
      }
      console.error('Unexpected error in creating playlist:', error);
      throw error;
    }
  }

  async findAll() {
    const playlists = await this.databaseService.playlist.findMany({
      include: {
        trackList: {
          include: {
            track: true,
          },
        },
      },
    });

    if (playlists?.length === 0) {
      return {
        message: 'No playlists found.',
      };
    }

    return playlists.map((playlist) => ({
      ...playlist,
      playtime: playlist.trackList.reduce(
        (sum, pt) => sum + pt.track.duration,
        0,
      ),
    }));
  }

  async findOne(id: string) {
    const playlist = await this.databaseService.playlist.findUnique({
      where: { id },
      include: {
        trackList: {
          include: {
            track: true,
          },
        },
      },
    });

    if (!playlist) {
      throw new NotFoundException(`Playlist with ID '${id}' not found.`);
    }

    const playtime = playlist.trackList.reduce(
      (sum, pt) => sum + pt.track.duration,
      0,
    );

    return { ...playlist, playtime };
  }

  async update(id: string, updatePlaylistDto: UpdatePlaylistDto) {
    const playlist = await this.databaseService.playlist.findUnique({
      where: { id },
    });

    if (!playlist) {
      throw new NotFoundException(`Playlist with ID '${id}' not found.`);
    }

    return this.databaseService.playlist.update({
      where: { id },
      data: { ...updatePlaylistDto },
    });
  }

  async remove(id: string) {
    const playlist = await this.databaseService.playlist.findUnique({
      where: { id },
      include: { trackList: true },
    });

    if (!playlist) {
      throw new NotFoundException(`Playlist with ID '${id}' not found.`);
    }

    if (playlist.trackList.length > 0) {
      throw new ConflictException(
        `Playlist with ID '${id}' cannot be deleted because it still contains tracks.`,
      );
    }

    try {
      return await this.databaseService.playlist.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Playlist with ID '${id}' not found.`);
      }
      console.error('Unexpected error in removing playlist:', error);
      throw error;
    }
  }

  async addTrack(playlistId: string, dto: AddTrackToPlaylistDto) {
    const { trackId } = dto;

    const playlist = await this.databaseService.playlist.findUnique({
      where: { id: playlistId },
    });

    if (!playlist)
      throw new NotFoundException(`Playlist '${playlistId}' not found`);

    const track = await this.databaseService.track.findUnique({
      where: { id: trackId },
    });

    if (!track) throw new NotFoundException(`Track '${trackId}' not found`);

    try {
      return await this.databaseService.playlistTrack.create({
        data: { playlistId, trackId },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Track is already in the playlist.`);
      }
      console.error('Unexpected error in adding track to playlist:', error);
      throw error;
    }
  }

  async removeTrack(playlistId: string, trackId: string) {
    const existingLink = await this.databaseService.playlistTrack.findUnique({
      where: {
        playlistId_trackId: {
          playlistId,
          trackId,
        },
      },
    });

    if (!existingLink) {
      throw new NotFoundException(
        `Track '${trackId}' is not in playlist '${playlistId}' or was already removed.`,
      );
    }

    return this.databaseService.playlistTrack.delete({
      where: {
        playlistId_trackId: {
          playlistId,
          trackId,
        },
      },
    });
  }
}
