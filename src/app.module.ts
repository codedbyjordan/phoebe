import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SearchController } from 'src/search/search.controller';
import { SearchModule } from 'src/search/search.module';
import { SearchService } from 'src/search/search.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [SearchModule, HttpModule],
  controllers: [AppController, SearchController],
  providers: [AppService, SearchService],
})
export class AppModule {}
