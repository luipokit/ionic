import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnimalsPage } from './animals.page';
import { ProfilePage } from './profile/profile.page';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

const routes: Routes = [
  {
    path: '',
    component: AnimalsPage
  },
  {
    path: ':id', 
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    AnimalsPage,
    ProfilePage
  ]
})


export class AnimalsPageModule {
  constructor(private sqlite: SQLite) { 
    this.sqlite.create({
			name: 'SQLiteDB.db',
			location: 'default'
		})
  }
}
