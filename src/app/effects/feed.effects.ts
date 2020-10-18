import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import * as xmlParser from 'fast-xml-parser';
import { EMPTY } from 'rxjs';
import * as FeedActions from '../actions/feed.actions';
import { RssFeedsService } from 'src/app/rss-feeds/services/rss-feeds.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class FeedEffects {
  loadFeeds$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[RSS Feed Page] Load Feeds'),
      mergeMap(() =>
        this.rssFeedService.getRSSFeeds().pipe(
          switchMap((feeds) => {
            let activeFeed = '';
            const jsonFeeds = feeds.map((feed, i) => {
              let feedObject = feed;
              if (xmlParser.validate(feedObject) === true) {
                feedObject = xmlParser.parse(feedObject).rss.channel;
              } else {
                feedObject = JSON.parse(feedObject);
              }
              const subscription = this.store
                .select('feeds')
                .subscribe((res) => {
                  feedObject.rssUrl = res.feedUrls[i];
                  activeFeed = res.activeFeed;
                });
              subscription.unsubscribe();
              return feedObject;
            });
            const actonsArray: any = [
              FeedActions.feedsLoaded({ payload: jsonFeeds }),
            ];

            if (!activeFeed) {
              actonsArray.push(
                FeedActions.updateActiveFeed({
                  payload: { activeFeed: jsonFeeds[0].rssUrl },
                })
              );
              actonsArray.push(FeedActions.getArticlesByFeed());
            }

            return [...actonsArray];
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private rssFeedService: RssFeedsService,
    private store: Store<any>
  ) {}
}
