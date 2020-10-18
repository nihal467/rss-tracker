import { createAction, props } from '@ngrx/store';

export const loadFeeds = createAction('[RSS Feed Page] Load Feeds');
export const feedsLoaded = createAction(
  '[RSS Feed API] Feeds Loaded Success',
  props<{ payload: any }>()
);
