import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';

export const intialState = {
  feeds: {
    feedUrls: [
      'https://www.smh.com.au/rss/feed.xml',
      'assets/mocks/mock.feed.json',
    ],
    newFeedUrl: '',
    rssFeeds: [],
    activeFeed: '',
    articles: {},
  },
};

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forRoot({})],
  providers: [provideMockStore({ initialState: intialState })],
})
export class MockStoreModule {}
