import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  provideMockStore,
  MockStore,
  MockStoreConfig,
} from '@ngrx/store/testing';
import * as FeedAction from '../../../actions/feed.actions';
import { MockStoreModule } from 'src/app/test/mock/mock-store/mock-store.module';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let store: MockStore;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [MockStoreModule],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call subscribe', () => {
    store.dispatch(
      FeedAction.updateActiveFeed({ payload: { activeFeed: 'somefeed' } })
    );
  });

  it('should delete feed', () => {
    component.deleteFeed('somefeed');
  });

  it('should show feed articles', () => {
    component.showArticles('somefeed', true);
  });
});
