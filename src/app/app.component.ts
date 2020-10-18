import { Component } from '@angular/core';
import { RssFeedsService } from 'src/app/rss-feeds/services/rss-feeds.service';
import * as xmlParser from 'fast-xml-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rss-tracker';
  constructor(private rssFeedService: RssFeedsService) {
    this.rssFeedService.getRSSFeeds().subscribe((res) => {
      console.log(res);
      console.log(xmlParser.parse(res));
    });
  }
}
