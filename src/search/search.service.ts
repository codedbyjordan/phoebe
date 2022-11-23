import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  search(query) {
    const baseUrl = 'https://html.duckduckgo.com/html?q=';
    return query;
  }
}
