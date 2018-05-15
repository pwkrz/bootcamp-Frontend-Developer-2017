import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routerModule } from './play-list.routing';

import { PlayListComponent } from './play-list.component';
import { PlaylistFormComponent } from './playlist-detail/playlist-form.component';
import { PlaylistListComponent } from './playlist-list.component';
import { ContentCardComponent } from './playlist-detail/content-card.component';
import { PlaylistSelectedComponent } from './playlist-detail/playlist-selected.component';
import { PlaylistsService } from './playlists.service';

import PlaylistsExampleData from './playlists.data';
import playlistsData from './playlists.data';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
  providers: [
    PlaylistsService,
    {provide: "PlaylistsExampleData", useValue: PlaylistsExampleData},
    {provide: "PlaylistsData", useFactory : (data) => {

      data.push({
        id: Date.now(),
        name: "Damo Suzuki: Back in the DRKP",
        tracks: 1,
        color: "#0ff",
        favourite: false
      });

      return data;

    }, deps: ["PlaylistsExampleData"]}
  ]
})
export class PlayListModule { }
