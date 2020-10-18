import { createAction, props } from '@ngrx/store';

export const loadFeeds = createAction('[RSS Feed Page] Load Feeds');
export const feedsLoaded = createAction(
  '[RSS Feed API] Feeds Loaded Success',
  props<{ payload: any }>()
);
export const addNewFeedUrl = createAction(
  '[RSS Feed Sidebar Page] Add New Feed Url',
  props<{ payload: any }>()
);

export const updateActiveFeed = createAction(
  '[RSS Feed Sidebar Page] Update Active Feed',
  props<{ payload: any }>()
);

export const getArticlesByFeed = createAction(
  '[RSS Feed Main Content Page] Get Articles By Feed'
);

export const resetArticles = createAction(
  '[RSS Feed Main Content Page] Reset Articles'
);

export const deleteFeed = createAction(
  '[RSS Feed Sidebar Page] Delete Feed',
  props<{ payload: any }>()
);
