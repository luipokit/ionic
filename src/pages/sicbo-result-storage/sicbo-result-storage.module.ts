import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SicboResultStoragePage } from './sicbo-result-storage.page';

const routes: Routes = [
  {
    path: '',
    component: SicboResultStoragePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SicboResultStoragePage]
})
export class SicboResultStoragePageModule {}
