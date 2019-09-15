import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  toUser: Object;

  // constructor(public navCtrl: NavController) {

  constructor(private router: Router) {
    this.toUser = {
      toUserId:'210000198410281948',
      toUserName:'Hancock'
    }
  }

  
  go() {
    this.router.navigateByUrl('/animals');
  }
}
