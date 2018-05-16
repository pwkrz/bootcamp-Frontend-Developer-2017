import { FooterBarComponent } from './nav-bar/footer-bar.component';
import { PlaylistSelectionService } from './music-shared/playlist-selection.service';
import { PlaylistsService } from './play-list/playlists.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { PlayListModule } from './play-list/play-list.module';
import { MusicSearchModule } from './music-search/music-search.module';
import { routerModule } from './spm.routing';

import { SPMComponent } from './spm.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MusicSharedModule } from './music-shared/music-shared.module';

@NgModule({
  declarations: [
    SPMComponent,
    NavBarComponent,
    FooterBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    PlayListModule,
    MusicSearchModule,
    MusicSharedModule,
    routerModule
  ],
  providers: [
    PlaylistsService,
    PlaylistSelectionService
  ],
  bootstrap: [SPMComponent]
})
export class AppModule {

  constructor(){
  }
}
