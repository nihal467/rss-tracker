import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as FeedAction from '../../../actions/feed.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() channels;
  @Input() activeFeed;
  subscriber: any;
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.subscriber = this.store.pipe(select('feeds')).subscribe((res) => {
      if (res.activeFeed) {
        this.showArticles(res.activeFeed, true);
      }
    });
  }

  deleteFeed(id): void {
    this.store.dispatch(FeedAction.deleteFeed({ payload: { rssUrl: id } }));
    this.store.dispatch(FeedAction.loadFeeds());
  }

  showArticles(id, unsubscribe?): void {
    this.activeFeed = id;
    if (unsubscribe) {
      this.subscriber.unsubscribe();
    }
    console.log(id);
    this.store.dispatch(
      FeedAction.updateActiveFeed({ payload: { activeFeed: id } })
    );
    this.store.dispatch(FeedAction.getArticlesByFeed());
  }
}
