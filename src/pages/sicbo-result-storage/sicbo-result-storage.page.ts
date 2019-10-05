import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import {
  NavParams
} from '@ionic/angular';

@Component({
  selector: 'app-sicbo-result-storage',
  templateUrl: './sicbo-result-storage.page.html',
  styleUrls: ['./sicbo-result-storage.page.scss'],
})
export class SicboResultStoragePage implements OnInit {

  // Data passed in by componentProps
  @Input() storeSicboList: any;
  @Input() modal: any;

  public currentStoreSicboList;
  public currentModal;

  public dice_array = [{
      index: 1,
      src: '../../assets/img/dice_1.png'
    },
    {
      index: 2,
      src: '../../assets/img/dice_2.png'
    },
    {
      index: 3,
      src: '../../assets/img/dice_3.png'
    },
    {
      index: 4,
      src: '../../assets/img/dice_4.png'
    },
    {
      index: 5,
      src: '../../assets/img/dice_5.png'
    },
    {
      index: 6,
      src: '../../assets/img/dice_6.png'
    },
  ];

  constructor(
    public navParams: NavParams
  ) {}

  ngOnInit() {
    if (this.navParams.get('storeSicboList')) {
      this.currentStoreSicboList = this.navParams.get('storeSicboList');

      for (const sicboList of this.currentStoreSicboList) {
        this.checkBigOrSmallOrTriple(sicboList);
      }

    }
    if (this.navParams.get('modal')) {
      this.currentModal = this.navParams.get('modal');
    }
  }

  async dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => {
        this.currentModal = null;
      });
    }
  }

  checkBigOrSmallOrTriple(sicboList) {

    if (this.checkTriple(sicboList)) {
      sicboList.push('圍', this.checkSumUp(sicboList));
    } else if (this.checkSumUp(sicboList) >= 11 && this.checkSumUp(sicboList) <= 17) {
      sicboList.push('大', this.checkSumUp(sicboList));
    } else if (this.checkSumUp(sicboList) >= 4 && this.checkSumUp(sicboList) <= 10) {
      sicboList.push('小', this.checkSumUp(sicboList));
    }

  }

  checkTriple(sicboList) {

    // const allEqual = arr => arr.every(v => v === arr[0]);
    // allEqual([1, 1, 1, 1]);

    // one-liner
    // [1, 1, 1, 1].every( (val, i, arr) => val === arr[0] );

    const allEqual = arr => arr.every(v => v === arr[0]);
    return allEqual(sicboList);
  }

  checkSumUp(list) {
    return list.reduce((a, b) => a + b, 0);
  }

}
