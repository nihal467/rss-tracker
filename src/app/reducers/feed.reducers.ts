import { Action, createReducer, on } from '@ngrx/store';
import * as FeedActions from '../actions/feed.actions';
export const intialState = {};
const reducer = createReducer(
  intialState,
  on(FeedActions.loadFeeds, (state) => state),
  on(FeedActions.feedsLoaded, (state, { payload }) => {
    return { ...state, rss: payload.rss };
  })
);

export const FeedReducer = (state: any, action: Action): any => {
  return reducer(state, action);
};
