import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPage } from './list.page';

import { Storage } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListPage
      }
    ])
  ],
  declarations: [ListPage]
})
export class ListPageModule {

  constructor(private storage: Storage) {
    // set a key/value
    storage.set('name', 'Max');
    storage.set('age', 20);

    // Or to get a key/value pair
    storage.get('age').then((val) => {
      console.log('Your age is', val);
    });
  }
}
