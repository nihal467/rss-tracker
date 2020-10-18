import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as xmlParser from 'fast-xml-parser';
import { EMPTY } from 'rxjs';
import * as FeedActions from '../actions/feed.actions';
import { RssFeedsService } from 'src/app/rss-feeds/services/rss-feeds.service';

@Injectable({
  providedIn: 'root',
})
export class FeedEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[RSS Feed Page] Load Feeds'),
      mergeMap(() =>
        this.rssFeedService.getRSSFeeds().pipe(
          map((feeds) => {
            const jsonFeeds = xmlParser.parse(feeds);
            return FeedActions.feedsLoaded({ payload: jsonFeeds });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private rssFeedService: RssFeedsService
  ) {}
}
