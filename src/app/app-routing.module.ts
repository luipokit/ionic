import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule'
  },
  { path: 'game', 
    loadChildren: './pages/game/game.module#GamePageModule' 
  },
  { 
    path: 'animals', 
    loadChildren: './pages/animals/animals.module#AnimalsPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'movies', 
    loadChildren: './pages/movies/movies.module#MoviesPageModule' 
  },
  { 
    path: 'movies/:id', 
    loadChildren: './pages/movie-details/movie-details.module#MovieDetailsPageModule' 
  },
  { 
    path: 'buddha', 
    loadChildren: './pages/buddha/buddha.module#BuddhaPageModule'
  },
  { 
    path: 'buddha/:id', 
    loadChildren: './pages/buddha-details/buddha-details.module#BuddhaDetailsPageModule' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
