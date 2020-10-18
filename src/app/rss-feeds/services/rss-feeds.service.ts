import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RssFeedsService {
  urls$: Observable<any>;
  urlList: any[];
  constructor(private httpClient: HttpClient, private store: Store<any>) {
    this.urls$ = store.pipe(select('feeds'));
    this.urls$.subscribe((res) => {
      this.urlList = res.feedUrls;
      console.log(res);
    });
  }

  getRSSFeeds(): Observable<any> {
    const requestOptions: Object = {
      observe: 'body',
      responseType: 'text',
    };
    const urlsToCall = this.urlList.map((url) => {
      return this.httpClient.get(url, requestOptions);
    });

    return forkJoin(urlsToCall);
    // return this.httpClient.get<any>(this.url, requestOptions);
  }
}
