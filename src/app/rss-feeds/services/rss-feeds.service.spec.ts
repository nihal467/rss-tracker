import { TestBed } from '@angular/core/testing';

import { RssFeedsService } from './rss-feeds.service';

describe('RssFeedsService', () => {
  let service: RssFeedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RssFeedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
