import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RssFeedsHomeComponent } from './components/rss-feeds-home/rss-feeds-home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { RssFeedsRoutingModule } from 'src/app/rss-feeds/rss-feeds-routing.module';

@NgModule({
  declarations: [RssFeedsHomeComponent, SidebarComponent, MainContentComponent],
  imports: [CommonModule, RssFeedsRoutingModule],
})
export class RssFeedsModule {}
