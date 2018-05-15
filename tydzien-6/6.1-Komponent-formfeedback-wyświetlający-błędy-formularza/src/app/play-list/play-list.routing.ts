import { RouterModule, Routes } from '@angular/router';

import { PlayListComponent } from './play-list.component';
import { PlaylistSelectedComponent } from './playlist-detail/playlist-selected.component';
import { PlaylistFormComponent } from './playlist-detail/playlist-form.component';

const routesConfig: Routes = [
    {path: 'playlists', component: PlayListComponent,
        children: [
            {path: '', component: PlaylistSelectedComponent },
            {path: 'new', component: PlaylistFormComponent },
            {path: ':id', component: PlaylistSelectedComponent },
            {path: ':id/edit', component: PlaylistFormComponent }
        ]
    }
];

export const routerModule = RouterModule.forChild(routesConfig)