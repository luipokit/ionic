import {
  BuddhaService
} from '../../services/buhha/buddha.service';

import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  Observable,
} from 'rxjs';

import {
  HttpClient
} from '@angular/common/http';

import {
  Platform,
  IonInfiniteScroll
} from '@ionic/angular';

import {
  UtilsService
} from '../../services/utils/utils.service';


@Component({
  selector: 'app-buddha',
  templateUrl: './buddha.page.html',
  styleUrls: ['./buddha.page.scss'],
})
export class BuddhaPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  results: Observable < any > ;
  searchTerm = '';
  data = [];
  pageNo = 0;
  totalPage = 0;
  size = 10;

  constructor(
    public platform: Platform,
    private buddhaService: BuddhaService,
    private utils: UtilsService,
    private http: HttpClient
  ) {}

  loadBuddha() {

    this.pageNo += 1;

    this.utils.HttpGet(
      this.utils.PROD_SERVER_URL, {
        'pageNo': this.pageNo.toString(),
        'size': this.size.toString()
      }, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      response => {
        if (this.platform.is('cordova')) {
          const responseObj = JSON.parse(response);
          console.table(responseObj);
          for (const newData of responseObj.data) {
            this.data.push(newData);
          }
        } else {
          console.table(response.data);
          this.data.push({'page' : `Page ${this.pageNo}`});
          this.totalPage = response.pages;
          for (const newData of response.data) {
            this.data.push(newData);
          }
        }
      },
      error => {
        console.log(error);
      },
      () => {
        console.log(`Get Page ${this.pageNo} !`);
      }
    );
  }

  ngOnInit() {
    if (this.searchTerm === '' || this.searchTerm == null) {
      this.loadBuddha();
    }
    // this.getData();
  }

  loadMoreData(event) {
    setTimeout(() => {
      if (this.searchTerm === '' || this.searchTerm == null) {
        this.loadBuddha();
      } else {
        this.loadBuddhaSearchData();
      }
      event.target.complete();
    }, 1000);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  searchChanged() {
    this.pageNo = 1;
    this.results = this.buddhaService.searchData(this.searchTerm, this.pageNo);
    this.results.subscribe(response => {
      console.table(response);
      this.data = [];
      this.data.push({'page' : `Page ${this.pageNo}`});
      this.totalPage = response.pages;
      for (const data of response['data']) {
        this.data.push(data);
      }
    });
  }

  getData() {
    this.buddhaService.getData(this.utils.PROD_SERVER_URL);
    // temp.subscribe(data => {
    //   console.log(data);
    // });
  }

  loadBuddhaSearchData() {
    this.pageNo += 1;
    this.results = this.buddhaService.searchData(this.searchTerm, this.pageNo);
    this.results.subscribe(response => {
      console.table(response);
      this.data.push({'page' : `Page ${this.pageNo}`});
      this.totalPage = response.pages;
      for (const data of response['data']) {
        this.data.push(data);
      }
    });
  }
}
