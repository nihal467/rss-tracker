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

  ngOnInit(): void {}

  /**
   * deletes feed from the store by calling {deleteFeed} action
   * loads the feeds using {loadFeeds} acton
   * @param id the {string} that holds feed url
   */
  deleteFeed(id): void {
    this.store.dispatch(FeedAction.deleteFeed({ payload: { rssUrl: id } }));
    this.store.dispatch(FeedAction.loadFeeds());
  }

  /**
   * shows the selected feeds articles and highlight the selected feed in sidebar
   * @param id the {string} that holds feedurl
   * @param unsubscribe the {boolean} that used to unsubscribe store subscription
   * if this method called from store subscription.
   */
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
