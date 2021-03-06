import { MusicSharedModule } from './../music-shared/music-shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routerModule } from './play-list.routing';

import { PlayListComponent } from './play-list.component';
import { PlaylistFormComponent } from './playlist-detail/playlist-form.component';
import { PlaylistListComponent } from './playlist-list.component';
import { ContentCardComponent } from './playlist-detail/content-card.component';
import { PlaylistSelectedComponent } from './playlist-detail/playlist-selected.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MusicSharedModule,
    routerModule
  ],
  declarations: [
    PlayListComponent,
    PlaylistFormComponent,
    PlaylistListComponent,
    ContentCardComponent,
    PlaylistSelectedComponent
  ],
  exports: [
    PlayListComponent
  ],
  providers: []
})
export class PlayListModule { }
