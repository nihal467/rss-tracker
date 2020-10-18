import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockStore } from '@ngrx/store/testing';

import { of } from 'rxjs';
import { MockStoreModule } from 'src/app/test/mock/mock-store/mock-store.module';

import { RssFeedsService } from './rss-feeds.service';

describe('RssFeedsService', () => {
  let service: RssFeedsService;
  let store: MockStore;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  httpClientSpy.get.and.returnValue(of({ data: {} }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockStoreModule],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        // { provide: Store },
        // { provide: StateObservable },
        // { provide: ActionsSubject },
      ],
    });
    service = TestBed.inject(RssFeedsService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('set state to feedurls', () => {
    store.setState({ feedUrls: ['google.com'] });
  });

  it('call rss feed', () => {
    service.getRSSFeeds();
  });
});
