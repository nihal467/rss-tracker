import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RssFeedsHomeComponent } from './rss-feeds-home.component';

describe('RssFeedsHomeComponent', () => {
  let component: RssFeedsHomeComponent;
  let fixture: ComponentFixture<RssFeedsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RssFeedsHomeComponent ]
    })
    .compileComponents();
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
