import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { RssFeedsHomeComponent } from './rss-feeds-home.component';

describe('RssFeedsHomeComponent', () => {
  let component: RssFeedsHomeComponent;
  let store: MockStore;
  let fixture: ComponentFixture<RssFeedsHomeComponent>;
  const intialState = {
    feeds: {
      feedUrls: [
        'https://www.smh.com.au/rss/feed.xml',
        'assets/mocks/mock.feed.json',
      ],
      newFeedUrl: '',
      rssFeeds: [],
      activeFeed: '',
      articles: {},
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RssFeedsHomeComponent],
      imports: [StoreModule.forRoot({})],
      providers: [provideMockStore({ initialState: intialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RssFeedsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
