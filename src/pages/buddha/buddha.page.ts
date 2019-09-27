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

  ngOnInit() {
    if (this.searchTerm === '' || this.searchTerm == null) {
      this.loadBuddha();
    }
    // this.getData();
  }

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
        let scriptures: any;

        if (this.platform.is('cordova')) {
          scriptures = JSON.parse(response);
        } else {
          scriptures = response;
        }

        console.table(scriptures.data);
        this.data.push({
          'page': `Page ${this.pageNo}`
        });
        this.totalPage = scriptures.pages;
        for (const newData of scriptures.data) {
          this.data.push(newData);
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
    this.data = [{
      'page': `Page ${this.pageNo}`
    }];

    const {
      param_title,
      param_id
    } = this.buddhaService.isTitleOrID(this.searchTerm);

    this.utils.HttpGet(
      this.utils.PROD_SERVER_URL, {
        'id': param_id,
        'title': param_title,
        'pageNo': this.pageNo.toString(),
        'size': this.size.toString()
      }, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      response => {
        let scripturesSearch: any;

        if (this.platform.is('cordova')) {
          scripturesSearch = JSON.parse(response);
        } else {
          scripturesSearch = response;
        }

        console.table(scripturesSearch.data);
        this.totalPage = scripturesSearch.pages;
        for (const newData of scripturesSearch.data) {
          this.data.push(newData);
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

  loadBuddhaSearchData() {

    if (this.pageNo < this.totalPage) {
      this.pageNo += 1;
      const {
        param_title,
        param_id
      } = this.buddhaService.isTitleOrID(this.searchTerm);

      this.utils.HttpGet(
        this.utils.PROD_SERVER_URL, {
          'id': param_id,
          'title': param_title,
          'pageNo': this.pageNo.toString(),
          'size': this.size.toString()
        }, {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        response => {
          let scripturesSearch: any;
          if (this.platform.is('cordova')) {
            scripturesSearch = JSON.parse(response);
          } else {
            scripturesSearch = response;
          }

          console.table(scripturesSearch.data);

          this.data.push({
            'page': `Page ${this.pageNo}`
          });

          this.totalPage = scripturesSearch.pages;
          for (const newData of scripturesSearch.data) {
            this.data.push(newData);
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
  }

  getData() {
    this.buddhaService.getData(this.utils.PROD_SERVER_URL);
    // temp.subscribe(data => {
    //   console.log(data);
    // });
  }
}
