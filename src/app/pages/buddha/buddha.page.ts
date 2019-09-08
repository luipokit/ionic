import { BuddhaService } from '../../services/buhha/buddha.service';
import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buddha',
  templateUrl: './buddha.page.html',
  styleUrls: ['./buddha.page.scss'],
})
export class BuddhaPage implements OnInit {

  results: Observable<any>;
  public data: any;

  constructor(
    private buddhaService: BuddhaService, 
    private http: HttpClient
  ) { }

  ngOnInit() {
    // this.results = this.buddhaService.showData();
    // console.log(this.results);
  }

  showData() {
    this.buddhaService.showData()
      .subscribe((data) => {
        console.log(data)
      })
  }

}