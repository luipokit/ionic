import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SicboPage } from '../sicbo/sicbo.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  toUser: Object;

  // constructor(public navCtrl: NavController) {

  constructor(
    private router: Router,
    public modalController: ModalController
    ) {
    this.toUser = {
      toUserId: '210000198410281948',
      toUserName: 'Hancock'
    };
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SicboPage
    });
    return await modal.present();
  }


  go() {
    this.router.navigateByUrl('/animals');
  }
}
