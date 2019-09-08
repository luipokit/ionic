import { BuddhaService } from '../../services/buhha/buddha.service';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-buddha',
  templateUrl: './buddha.page.html',
  styleUrls: ['./buddha.page.scss'],
})
export class BuddhaPage implements OnInit {

  results: Observable<any>;
  public data: any;

  constructor(
    public platform: Platform,
    private buddhaService: BuddhaService, 
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.results = this.buddhaService.showRealData()
    this.results.subscribe(data => {
      console.log(data)
    })
  }

  showData() {
    this.buddhaService.showRealData()
      .subscribe((data) => {
        console.log(data)
      })
  }

}