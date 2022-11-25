import { Controller, Get, Query, Render } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  @Render('search')
  async search(@Query('query') query) {
    const results = await this.searchService.search(query);
    return {
      query,
      results,
    };
  }
}
