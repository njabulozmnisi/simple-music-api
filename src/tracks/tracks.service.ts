import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '../../prisma/generated/prisma';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    const data: Prisma.TrackCreateInput = { ...createTrackDto };

    try {
      return await this.databaseService.track.create({ data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `A track named "${data.name}" by artist "${data.artist}" in album "${data.album}" already exists.`,
        );
      }
      console.error('Unexpected error in creating track:', error);
      throw error;
    }
  }

  async findAll() {
    const tracks = await this.databaseService.track.findMany();

    if (tracks?.length === 0) {
      return {
        message: 'No tracks found.',
      };
    }

    return tracks;
  }

  async findOne(id: string) {
    const track = await this.databaseService.track.findUnique({
      where: {
        id: id,
      },
    });

    if (!track) {
      throw new NotFoundException(`Track with ID '${id}' not found.`);
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.databaseService.track.findUnique({
      where: {
        id: id,
      },
    });

    if (!track) {
      throw new NotFoundException(`Track with ID '${id}' not found.`);
    }
    const data: Prisma.TrackUpdateInput = {
      ...updateTrackDto,
    };

    return this.databaseService.track.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async remove(id: string) {
    const track = await this.databaseService.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`Track with ID '${id}' not found.`);
    }

    const usedInPlaylists = await this.databaseService.playlistTrack.findFirst({
      where: { trackId: id },
    });

    if (usedInPlaylists) {
      throw new ConflictException(
        `Track with ID '${id}' cannot be deleted because it is part of a playlist.`,
      );
    }

    try {
      return await this.databaseService.track.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track with ID '${id}' not found.`);
      }
      console.error('Unexpected error in removing track:', error);
      throw error;
    }
  }
}
