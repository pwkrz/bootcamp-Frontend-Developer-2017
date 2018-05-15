import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routerModule } from './music-search.routing'

import { AlbumListComponent } from './view-components/album-list.component';
import { AlbumCardComponent } from './view-components/album-card.component';
import { MusicSearchComponent } from './music-search.component';
import { MusicSearchService } from './music-search.service';
import { AuthService } from './../auth.service';

import { AlbumSearchFormComponent } from './view-components/album-search-form.component';
import { AlbumDetailsComponent } from './view-components/details/album-details.component';
import { TrackListComponent } from './view-components/details/track-list.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routerModule
  ],
  exports: [MusicSearchComponent],
  declarations: [AlbumListComponent, AlbumCardComponent, MusicSearchComponent, AlbumSearchFormComponent, AlbumDetailsComponent, TrackListComponent],
  providers: [MusicSearchService, AuthService]
})
export class MusicSearchModule {
  constructor(private auth: AuthService){
    this.auth.getToken();
  }
}
