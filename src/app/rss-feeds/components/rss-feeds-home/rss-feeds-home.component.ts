import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, repeat, tap } from 'rxjs/operators';
import * as FeedAction from '../../../actions/feed.actions';

@Component({
  selector: 'app-rss-feeds-home',
  templateUrl: './rss-feeds-home.component.html',
  styleUrls: ['./rss-feeds-home.component.scss'],
})
export class RssFeedsHomeComponent implements OnInit {
  feeds$: Observable<any>;
  channel: any[];
  constructor(private store: Store<{ feeds: any }>) {
    this.feeds$ = store.pipe(select('feeds'));
    // this.rssFeedService.getRSSFeeds().subscribe((res) => {
    //   console.log(res);
    //   console.log(xmlParser.parse(res));
    // });
  }

  ngOnInit(): void {
    this.feeds$.subscribe((res) => {
      this.channel = (res.rss && res.rss.channel) || {};
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
