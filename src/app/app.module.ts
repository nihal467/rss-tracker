import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FeedEffects } from 'src/app/effects/feed.effects';
import { FeedReducer } from 'src/app/reducers/feed.reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ feeds: FeedReducer }),
    EffectsModule.forRoot([FeedEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
