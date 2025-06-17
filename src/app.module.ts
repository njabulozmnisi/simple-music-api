import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TracksModule } from './tracks/tracks.module';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [DatabaseModule, TracksModule, PlaylistsModule],
})
export class AppModule {}
