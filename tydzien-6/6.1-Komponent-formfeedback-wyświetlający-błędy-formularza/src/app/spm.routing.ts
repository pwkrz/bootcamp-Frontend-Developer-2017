import { RouterModule, Routes } from '@angular/router';

import { PlayListComponent } from './play-list/play-list.component';
import { MusicSearchComponent } from './music-search/music-search.component';

const routesConfig: Routes = [
  {path: '', redirectTo: 'search', pathMatch: 'full' },
  {path: '**', redirectTo: 'search', pathMatch: 'full' }
];

export const routerModule = RouterModule.forRoot(routesConfig, {
  // enableTracing: true
})