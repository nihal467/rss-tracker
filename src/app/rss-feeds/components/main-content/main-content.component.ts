import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FeedAction from '../../../actions/feed.actions';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {
  articles: any = [];
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.select('feeds').subscribe((res) => {
      this.articles = res.articles[res.activeFeed];
    });
  }
}
