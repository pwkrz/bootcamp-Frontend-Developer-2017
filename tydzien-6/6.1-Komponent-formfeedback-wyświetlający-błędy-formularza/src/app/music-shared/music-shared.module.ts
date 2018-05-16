import { PlaylistSelectionService } from './playlist-selection.service';
import { TrackListComponent } from './track-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistSelectorComponent } from './playlist-selector.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PlaylistSelectorComponent,
    TrackListComponent
  ],
  declarations: [
    PlaylistSelectorComponent,
    TrackListComponent
  ],
  providers: [
    PlaylistSelectionService
  ]
})
export class MusicSharedModule { }
