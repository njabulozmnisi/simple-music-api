import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddTrackToPlaylistDto {
  @ApiProperty({ example: 'track-id-456' })
  @IsString()
  trackId: string;
}
