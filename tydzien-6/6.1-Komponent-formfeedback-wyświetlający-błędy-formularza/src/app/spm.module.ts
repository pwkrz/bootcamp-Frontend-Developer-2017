import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { PlayListModule } from './play-list/play-list.module';
import { MusicSearchModule } from './music-search/music-search.module';
import { routerModule } from './spm.routing';

import { SPMComponent } from './spm.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    SPMComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PlayListModule,
    MusicSearchModule,
    routerModule
  ],
  bootstrap: [SPMComponent]
})
export class AppModule {

  constructor(){
  }
}
