import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BuddhaDetailsPage } from './buddha-details.page';

const routes: Routes = [
  {
    path: '',
    component: BuddhaDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BuddhaDetailsPage]
})
export class BuddhaDetailsPageModule {}
