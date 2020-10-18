import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import * as xmlParser from 'fast-xml-parser';
import { EMPTY, of } from 'rxjs';
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
            let newFeedUrl = '';
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
                  newFeedUrl = res.newFeedUrl;
                  feedObject.rssUrl = res.feedUrls[i];
                  activeFeed = res.activeFeed;
                });
              subscription.unsubscribe();
              if (feedObject.rssUrl.indexOf('assets') !== -1) {
                feedObject.item.unshift(this.createRandomObj());
              }

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
            } else if (newFeedUrl) {
              actonsArray.push(
                FeedActions.updateActiveFeed({
                  payload: { activeFeed: newFeedUrl },
                })
              );
            }

            actonsArray.push(FeedActions.getArticlesByFeed());

            return [...actonsArray];
          }),
          catchError((err) => {
            console.log(err);
            return of(FeedActions.deleteFeed({ payload: { rssUrl: err.url } }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private rssFeedService: RssFeedsService,
    private store: Store<any>
  ) {}

  createRandomObj(): object {
    const generatedObj = {
      'dc:creator': '',
      description: this.randomString(this.randomInt(4) + 4),
      guid: this.randomInt(1000),
      link:
        'https://www.smh.com.au/world/north-america/twitter-restricts-trumps-campaign-account-from-tweeting-20201016-p565md.html?ref=rss&amp;utm_medium=rss&amp;utm_source=rss_feed',
      pubDate: new Date(),
      title:
        this.randomString(this.randomInt(10) + 10) +
        ' ' +
        this.randomString(this.randomInt(10) + 10),
    };
    return generatedObj;
  }

  // helper functions

  randomInt(rightBound): number {
    return Math.floor(Math.random() * rightBound);
  }

  randomString(size): string {
    const alphaChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let generatedString = '';
    for (let i = 0; i < size; i++) {
      generatedString += alphaChars[this.randomInt(alphaChars.length)];
    }

    return generatedString;
  }
}
