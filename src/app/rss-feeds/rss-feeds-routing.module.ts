import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RssFeedsHomeComponent } from 'src/app/rss-feeds/components/rss-feeds-home/rss-feeds-home.component';

const routes: Routes = [
  {
    path: '',
    component: RssFeedsHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RssFeedsRoutingModule {}
