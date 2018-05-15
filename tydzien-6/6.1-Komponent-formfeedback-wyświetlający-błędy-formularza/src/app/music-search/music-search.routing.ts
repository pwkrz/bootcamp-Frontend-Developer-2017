import { RouterModule, Routes } from '@angular/router';

import { MusicSearchComponent } from './music-search.component';
import { AlbumDetailsComponent } from './view-components/details/album-details.component';

const routesConfig: Routes = [
    {path: 'search', component: MusicSearchComponent },
    {path: 'search/album/:album_id', component: AlbumDetailsComponent }
];

export const routerModule = RouterModule.forChild(routesConfig)