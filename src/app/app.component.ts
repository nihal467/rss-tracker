import { Component, OnInit } from '@angular/core';
import { RssFeedsService } from 'src/app/rss-feeds/services/rss-feeds.service';
import * as xmlParser from 'fast-xml-parser';
import { select, Store } from '@ngrx/store';
import * as FeedAction from './actions/feed.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rss-tracker';
}
