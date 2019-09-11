import { BuddhaService } from '../../services/buhha/buddha.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable, of, forkJoin, merge } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import { Platform, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-buddha',
  templateUrl: './buddha.page.html',
  styleUrls: ['./buddha.page.scss'],
})
export class BuddhaPage implements OnInit {
  
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  results: Observable<any>;
  searchTerm: string = '';
  data: any;
  pageNo: number = 1;

  constructor(
    public platform: Platform,
    private buddhaService: BuddhaService, 
    private http: HttpClient
  ) { 
  }

  ngOnInit() { 
    this.buddhaService
      .getData(
        this.buddhaService.PROD_SERVER_URL+ `&pageNo=${this.pageNo}`
      )
      .subscribe(data => {
        this.data = data
        console.log(data)
        console.log(`Get Page ${this.pageNo} !`)
      })
  }

  loadMoreData(event) {
    setTimeout(() => {
      this.pageNo++;
      this.buddhaService.getData(
        this.buddhaService.PROD_SERVER_URL+ `&pageNo=${
          this.pageNo
        }`
      )
      .subscribe(newDatas => {
        console.log(newDatas)
        for (const newData of newDatas['data']) {
          this.data.data.push(newData);
        }
        console.log(`Get Page ${this.pageNo} !`)
        event.target.complete();
      })
    }, 1000)
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  searchChanged() {
    this.results = this.buddhaService.searchData(this.searchTerm, this.pageNo)
    this.results.subscribe(data => {
      console.log(data)
    })
  }
}