import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlaylistDto {
  @ApiProperty({ example: 'Sunday Vibes' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'John.Cena' })
  @IsString()
  creator: string;
}
