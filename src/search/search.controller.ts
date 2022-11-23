import { Controller, Get, Query, Render } from '@nestjs/common';
import { SearchService } from 'src/search/search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  @Render('search')
  search(@Query('query') query) {
    this.searchService.search(query);
    return {
      query,
      results: [
        {
          title: 'Google',
          url: 'https://google.com',
          description: 'Just Google it.',
        },
      ],
    };
  }
}
