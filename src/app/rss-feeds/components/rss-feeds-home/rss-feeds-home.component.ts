import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  delay,
  distinctUntilChanged,
  mergeMap,
  repeat,
  tap,
} from 'rxjs/operators';
import * as FeedAction from '../../../actions/feed.actions';

@Component({
  selector: 'app-rss-feeds-home',
  templateUrl: './rss-feeds-home.component.html',
  styleUrls: ['./rss-feeds-home.component.scss'],
})
export class RssFeedsHomeComponent implements OnInit {
  feeds$: Observable<any>;
  channels: any[];
  constructor(private store: Store<{ feeds: any }>) {
    this.feeds$ = store.pipe(select('feeds'));
  }

  ngOnInit(): void {
    this.feeds$.pipe(distinctUntilChanged()).subscribe((res) => {
      this.channels = res.rssFeeds || [];
      if (this.channels.length) {
        // this.store.dispatch(
        //   FeedAction.updateActiveFeed({
        //     payload: { activeFeed: this.channels[0].rssUrl },
        //   })
        // );
        // this.store.dispatch(FeedAction.getArticlesByFeed());
      }
      console.log(res);
    });
    const poll = of({}).pipe(
      mergeMap((_) => of(this.store.dispatch(FeedAction.loadFeeds()))),
      delay(30000),
      repeat()
    );

    poll.subscribe();
  }
}
