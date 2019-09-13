import { BuddhaService } from '../../services/buhha/buddha.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable, of, forkJoin, merge } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import { Platform, IonInfiniteScroll } from '@ionic/angular';
import { UtilsService } from '../../services/utils/utils.service'

@Component({
  selector: 'app-buddha',
  templateUrl: './buddha.page.html',
  styleUrls: ['./buddha.page.scss'],
})
export class BuddhaPage implements OnInit {
  
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  results: Observable<any>;
  searchTerm: string = '';
  data = [];
  pageNo: number = 0;
  size: number = 10;

  constructor(
    public platform: Platform,
    private buddhaService: BuddhaService, 
    private utils: UtilsService,
    private http: HttpClient
  ) { 
  }

  loadBuddha() { 

    this.pageNo += 1;

    this.utils.HttpGet(
      this.utils.PROD_SERVER_URL, 
      {
        pageNo: this.pageNo,
        size: this.size
      }, 
      {}, 
      response => {
        for (const newData of response.data){
          this.data.push(newData)
        }
        console.log(this.data)
      }, 
      error => {
        console.log(error);
      },
      () => {
        console.log(`Get Page ${this.pageNo} !`)
      }
    )
  }

  ngOnInit() { 
    this.loadBuddha()
  }

  loadMoreData(event) {
    setTimeout(() => {
      this.loadBuddha();
      event.target.complete();
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