export interface AppState {
  feedUrls: Array<string>;
  newFeedUrl: string;
  rssFeeds: Array<Feed>;
  activeFeed: string;
  articles: object;
  error: string;
}

export interface Feed {
  rssUrl: string;
  item: Array<Article>;
}

export interface Article {
  'dc:creator': string;
  description: string;
  guid: string;
  link: string;
  pubDate: string;
  title: string;
  status?: string;
}
