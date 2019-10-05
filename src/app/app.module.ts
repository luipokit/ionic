import {
  NgModule
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  RouteReuseStrategy
} from '@angular/router';

import {
  IonicModule,
  IonicRouteStrategy
} from '@ionic/angular';
import {
  SplashScreen
} from '@ionic-native/splash-screen/ngx';
import {
  StatusBar
} from '@ionic-native/status-bar/ngx';
import {
  SQLite,
  SQLiteObject
} from '@ionic-native/sqlite/ngx';
import {
  Keyboard
} from '@ionic-native/keyboard/ngx';

import {
  AppComponent
} from './app.component';
import {
  AppRoutingModule
} from './app-routing.module';
// import { AuthGuard } from './auth-gaurd.service';

import {
  IonicStorageModule
} from '@ionic/storage';

import {
  HttpClientModule,
  HttpClientJsonpModule
} from '@angular/common/http';
import {
  HTTP
} from '@ionic-native/http/ngx';

import {
  SicboPageModule
} from '../../src/pages/sicbo/sicbo.module';

import {
  SicboResultPageModule
} from '../../src/pages/sicbo-result/sicbo-result.module';

import {
  SicboResultStoragePageModule
} from '../../src/pages/sicbo-result-storage/sicbo-result-storage.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpClientModule,
    HttpClientJsonpModule,
    SicboPageModule,
    SicboResultPageModule,
    SicboResultStoragePageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    HTTP,
    Keyboard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
