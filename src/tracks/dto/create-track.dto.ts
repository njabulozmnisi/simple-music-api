import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ example: 'Blinding Lights', required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Saturday', required: true })
  @IsString()
  @IsNotEmpty()
  album: string;

  @ApiProperty({ example: 'The Weeknd', required: true })
  @IsString()
  @IsNotEmpty()
  artist: string;

  @ApiProperty({
    example: 200,
    description: 'Duration in seconds',
    required: true,
  })
  @IsInt()
  duration: number;

  @ApiProperty({
    example: 'https://example.com/art.jpg',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  artworkUrl: string;

  @ApiProperty({
    example: 'https://example.com/audio.mp3',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  audioUrl: string;
}
