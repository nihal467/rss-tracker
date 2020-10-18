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
  activeFeed: string;
  constructor(private store: Store<{ feeds: any }>) {
    this.feeds$ = store.pipe(select('feeds'));
  }

  ngOnInit(): void {
    this.feeds$.pipe(distinctUntilChanged()).subscribe((res) => {
      this.channels = res.rssFeeds || [];
      this.activeFeed = res.activeFeed;
    });
    const poll = of({}).pipe(
      mergeMap((_) => of(this.store.dispatch(FeedAction.loadFeeds()))),
      delay(1000000),
      repeat()
    );

    poll.subscribe();
  }
}
