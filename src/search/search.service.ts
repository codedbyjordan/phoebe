import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { JSDOM } from 'jsdom';

@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

  async search(query) {
    const baseUrl = 'https://html.duckduckgo.com/html?q=';
    const res = await firstValueFrom(this.httpService.get(baseUrl + query));
    const data = res.data;
    console.log(data);

    const dom = new JSDOM(data);
    const document = dom.window.document;

    const results = [];
    const els = document.querySelectorAll('.links_main');

    for (const el of els) {
      const anchor = el.querySelector('.result__a') as HTMLAnchorElement;

      const url = anchor.href.split(
        /\/\/duckduckgo\.com\/l\/\?uddg\=|\?rut/,
      )[1];

      const titleEncoded = new dom.window.DOMParser().parseFromString(
        anchor.innerHTML,
        'text/html',
      );

      results.push({
        title: titleEncoded.documentElement.textContent,
        url: decodeURIComponent(url),
        description: document.querySelector('.result__snippet').innerHTML,
      });
    }

    return results;
  }
}
