import { Track } from '../../../prisma/generated/prisma';
import { ApiProperty } from '@nestjs/swagger';

export class TrackEntity implements Track {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  album: string;

  @ApiProperty()
  artist: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  artworkUrl: string;

  @ApiProperty()
  audioUrl: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
