import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  AuthGuard
} from '../../services/auth/auth.guard';

const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: '../home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: '../list/list.module#ListPageModule'
  },
  {
    path: 'game',
    loadChildren: '../game/game.module#GamePageModule'
  },
  {
    path: 'animals',
    loadChildren: '../animals/animals.module#AnimalsPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'movies',
    loadChildren: '../movies/movies.module#MoviesPageModule'
  },
  {
    path: 'movies/:id',
    loadChildren: '../movie-details/movie-details.module#MovieDetailsPageModule'
  },
  {
    path: 'buddha',
    loadChildren: '../buddha/buddha.module#BuddhaPageModule'
  },
  {
    path: 'buddha/:id',
    loadChildren: '../buddha-details/buddha-details.module#BuddhaDetailsPageModule'
  },
  {
    path: 'chat',
    loadChildren: '../chat/chat.module#ChatPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}