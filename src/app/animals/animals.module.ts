import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnimalsPage } from './animals.page';
import { ProfileComponent } from './profile/profile.component';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

const routes: Routes = [
  {
    path: '',
    component: AnimalsPage
  },
  {
    path: ':id', 
    component: ProfileComponent
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
    ProfileComponent
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
