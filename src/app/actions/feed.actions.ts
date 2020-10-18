/**
 * this is action file is intended to create
 * ngrx store actions which are dispatched from components and services
 * to communicate with store and state through reducers
 */
import { createAction, props } from '@ngrx/store';
import { Feed } from 'src/app/models/app-state';

export const loadFeeds = createAction('[RSS Feed Page] Load Feeds');
export const feedsLoaded = createAction(
  '[RSS Feed API] Feeds Loaded Success',
  props<{ payload: Array<Feed> }>()
);
export const addNewFeedUrl = createAction(
  '[RSS Feed Sidebar Page] Add New Feed Url',
  props<{ payload: { url: string } }>()
);

export const updateActiveFeed = createAction(
  '[RSS Feed Sidebar Page] Update Active Feed',
  props<{ payload: { activeFeed: string } }>()
);

export const getArticlesByFeed = createAction(
  '[RSS Feed Main Content Page] Get Articles By Feed'
);

export const resetArticles = createAction(
  '[RSS Feed Main Content Page] Reset Articles'
);

export const deleteFeed = createAction(
  '[RSS Feed Sidebar Page] Delete Feed',
  props<{ payload: { rssUrl: string } }>()
);

export const updateError = createAction(
  '[RSS Feed Sidebar page] Update error',
  props<{ payload: { error: string } }>()
);
