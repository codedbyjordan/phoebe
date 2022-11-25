import { Module } from '@nestjs/common';
import { SearchController } from 'src/search/search.controller';
import { SearchService } from 'src/search/search.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
