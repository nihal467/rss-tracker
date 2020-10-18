import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RssFeedsService {
  url = 'https://www.smh.com.au/rss/feed.xml';
  constructor(private httpClient: HttpClient) {}

  getRSSFeeds() {
    const requestOptions: Object = {
      observe: 'body',
      responseType: 'text',
    };
    return this.httpClient.get<any>(this.url, requestOptions);
  }
}
