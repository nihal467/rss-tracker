import { Action, createReducer, on } from '@ngrx/store';
import * as FeedActions from '../actions/feed.actions';
export const intialState = {
  feedUrls: [
    'https://www.smh.com.au/rss/feed.xml',
    'assets/mocks/mock.feed.json',
  ],
  rssFeeds: [],
  activeFeed: '',
  articles: [],
};
const reducer = createReducer(
  intialState,
  on(FeedActions.loadFeeds, (state) => state),
  on(FeedActions.getArticlesByFeed, (state) => {
    const activeArticles = state.rssFeeds.find((feed) => {
      return feed.rssUrl === state.activeFeed;
    });
    if (activeArticles) {
      return { ...state, articles: activeArticles.item };
    } else {
      return state;
    }
  }),
  on(FeedActions.updateActiveFeed, (state, { payload }) => {
    return { ...state, activeFeed: payload.activeFeed };
  }),
  on(FeedActions.feedsLoaded, (state, { payload }) => {
    return { ...state, rssFeeds: payload };
  }),
  on(FeedActions.addNewFeedUrl, (state, { payload }) => {
    const feedUrls = [...state.feedUrls];
    if (feedUrls.indexOf(payload.url) === -1) {
      feedUrls.push(payload.url);
    }
    return { ...state, feedUrls };
  }),
  on(FeedActions.deleteFeed, (state, { payload }) => {
    const feedUrls = [...state.feedUrls];
    const index = feedUrls.indexOf(payload.rssUrl);
    feedUrls.splice(index, 1);
    const rssFeeds = [...state.rssFeeds];
    const rssFeedIndex = rssFeeds.findIndex((rssFeed) => {
      return rssFeed.rssUrl === payload.rssUrl;
    });
    let activeFeed = state.activeFeed;
    let articles = [...state.articles];
    if (state.activeFeed === payload.rssUrl) {
      activeFeed = '';
      articles = [];
    }
    rssFeeds.splice(index, 1);
    return { ...state, rssFeeds, feedUrls, activeFeed, articles };
  })
);

export const FeedReducer = (state: any, action: Action): any => {
  return reducer(state, action);
};
