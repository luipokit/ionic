import {
  Component,
  OnInit
} from '@angular/core';
import {
  ModalController,
  Platform
} from '@ionic/angular';
import {
  ScreenOrientation
} from '@ionic-native/screen-orientation/ngx';
import {
  SicboResultPage
} from '../sicbo-result/sicbo-result.page';
import {
  SicboResultStoragePage
} from '../sicbo-result-storage/sicbo-result-storage.page';



@Component({
  selector: 'app-sicbo',
  templateUrl: './sicbo.page.html',
  styleUrls: ['./sicbo.page.scss'],
})
export class SicboPage implements OnInit {

  cash = 200000;

  terminate = false;

  sicboList = [];
  storeSicboList = [];

  // Check Win List
  winList = [];

  // BIG / SMALL
  bigList = [];
  smallList = [];

  // Number
  list_4 = [];
  list_5 = [];
  list_6 = [];
  list_7 = [];
  list_8 = [];
  list_9 = [];
  list_10 = [];
  list_11 = [];
  list_12 = [];
  list_13 = [];
  list_14 = [];
  list_15 = [];
  list_16 = [];
  list_17 = [];

  // One
  singleOneList = [];
  singleTwoList = [];
  singleThreeList = [];
  singleFourList = [];
  singleFiveList = [];
  singleSixList = [];

  // Double
  doubleOneList = [];
  doubleTwoList = [];
  doubleThreeList = [];
  doubleFourList = [];
  doubleFiveList = [];
  doubleSixList = [];

  // Triple
  tripleList = [];
  tripleOneList = [];
  tripleTwoList = [];
  tripleThreeList = [];
  tripleFourList = [];
  tripleFiveList = [];
  tripleSixList = [];

  public cash100: any = {
    color: 'light',
    cashSelected: false
  };
  public cash200: any = {
    color: 'primary',
    cashSelected: false
  };
  public cash500: any = {
    color: 'secondary',
    cashSelected: false
  };
  public cash1000: any = {
    color: 'tertiary',
    cashSelected: false
  };
  public cash2000: any = {
    color: 'success',
    cashSelected: false
  };
  public cash5000: any = {
    color: 'warning',
    cashSelected: false
  };
  public cash10000: any = {
    color: 'danger',
    cashSelected: false
  };

  public isSelected = 'dark';

  public currentModal = null;

  constructor(
    public modalController: ModalController,
    public screenOrientation: ScreenOrientation,
    public platform: Platform,
  ) {}

  public ID;
  public timer = 10;

  ngOnInit() {
    if (this.platform.is('cordova')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
    this.click100();
    this.play();
  }

  ionViewWillLeave() {
    if (this.platform.is('cordova')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.screenOrientation.unlock();
    }
    this.terminate = true;
  }

  play() {
    const delay = function (s) {
      return new Promise(function (resolve, reject) {
        setTimeout(resolve, s);
      });
    };

    const recursion = () => delay(0)
      .then(() => {
        this.timer -= 1;
        return delay(1000);
      })
      .then(() => {
        this.timer -= 1;
        return delay(1000);
      })
      .then(() => {
        this.timer -= 1;
        return delay(1000);
      })
      .then(() => {
        this.timer -= 1;
        return delay(1000);
      })
      .then(() => {
        this.timer -= 1;
        return delay(1000);
      })
      .then(() => {
        this.timer -= 1;
        return delay(1000);
      })
      .then(() => {
        this.timer -= 1;
        return delay(1000);
      })
      .then(() => {
        this.timer -= 1;
        return delay(1000);
      })
      .then(() => {
        this.timer -= 1;
        return delay(1000);
      })
      .then(() => {
        this.timer -= 1;
        return delay(1000);
      })
      .then(() => {
        if (this.terminate !== true) {
          this.throwDice();
          recursion2();
        }
      });

    const recursion2 = () => delay(0)
      .then(() => {
        return delay(3000);
      }).then(() => {
        this.dismissModal();
        this.timer += 10;

        if (this.terminate !== true) {
          recursion();
        }

      });

    recursion();
  }

  async presentModal() {
    this.currentModal = await this.modalController.create({
      component: SicboResultPage,
      componentProps: {
        'first': this.sicboList[0],
        'second': this.sicboList[1],
        'third': this.sicboList[2],
        'winCash': this.checkSumUpWin(this.winList)
      },
      cssClass: 'my-custom-modal-css',
    });
    return await this.currentModal.present();
  }

  async presentSicboResultStorageModal() {
    this.currentModal = await this.modalController.create({
      component: SicboResultStoragePage,
      componentProps: {
        'storeSicboList': this.storeSicboList,
        'modal': this.currentModal
      },
      cssClass: 'sicbo-result-storage-modal-css',
    });
    return await this.currentModal.present();
  }


  async dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => {
        this.currentModal = null;
      });
    }
  }

  throwDice() {
    this.sicboList = [];
    for (let i = 0; i < 3; i++) {
      this.sicboList.push(Math.floor(Math.random() * 6) + 1);
    }

    // Check Win or Not
    this.checkWin(this.sicboList);

    // Show result
    this.presentModal();

    console.table(this.winList);

    // Reset all the bet list
    this.resetAllList();

    this.storeSicboList.unshift(this.sicboList);

    if (this.storeSicboList.length > 10) {
      this.storeSicboList.pop();
    }
    // console.table(this.storeSicboList);
  }

  checkDouble(sicboList) {
    if (sicboList[0] === sicboList[1]) {
      return sicboList[0];
    } else if (sicboList[0] === sicboList[2]) {
      return sicboList[0];
    } else if (sicboList[1] === sicboList[2]) {
      return sicboList[1];
    } else {
      return 0;
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

  checkSumUpWin(winList) {
    return winList.map((v) => v[1]) // second value of each
      .reduce((a, b) => a + b); // sum
  }

  checkWin(sicboList) {

    // sicboList = [1, 1, 2];

    // Check Triple
    if (this.checkTriple(sicboList)) {

      if (this.tripleList.length > 0) {
        this.winList.push([
          'Triple', this.checkSumUp(this.tripleList) * 25
        ]);
        this.cash += this.checkSumUp(this.tripleList) * 25;
      }

      switch (sicboList[0]) {
        case 1:
          this.winList.push([
            'Triple 1', this.checkSumUp(this.tripleOneList) * 151
          ]);
          this.cash += this.checkSumUp(this.tripleOneList) * 151;
          break;
        case 2:
          this.winList.push([
            'Triple 2', this.checkSumUp(this.tripleTwoList) * 151
          ]);
          this.cash += this.checkSumUp(this.tripleTwoList) * 151;
          break;
        case 3:
          this.winList.push([
            'Triple 3', this.checkSumUp(this.tripleThreeList) * 151
          ]);
          this.cash += this.checkSumUp(this.tripleThreeList) * 151;
          break;
        case 4:
          this.winList.push([
            'Triple 4', this.checkSumUp(this.tripleFourList) * 151
          ]);
          this.cash += this.checkSumUp(this.tripleFourList) * 151;
          break;
        case 5:
          this.winList.push([
            'Triple 5', this.checkSumUp(this.tripleFiveList) * 151
          ]);
          this.cash += this.checkSumUp(this.tripleFiveList) * 151;
          break;
        case 6:
          this.winList.push([
            'Triple 6', this.checkSumUp(this.tripleSixList) * 151
          ]);
          this.cash += this.checkSumUp(this.tripleSixList) * 151;
          break;
        default:
          break;
      }

    } else if (this.checkSumUp(sicboList) >= 11 && this.checkSumUp(sicboList) <= 17) {
      this.winList.push([
        'Big', this.checkSumUp(this.bigList) * 2
      ]);
      this.cash += this.checkSumUp(this.bigList) * 2;
    } else if (this.checkSumUp(sicboList) >= 4 && this.checkSumUp(sicboList) <= 10) {
      this.winList.push([
        'Small', this.checkSumUp(this.smallList) * 2
      ]);
      this.cash += this.checkSumUp(this.smallList) * 2;
    }

    // Check Double
    switch (this.checkDouble(sicboList)) {
      case 1:
        this.winList.push([
          'Double 1', this.checkSumUp(this.doubleOneList) * 9
        ]);
        this.cash += this.checkSumUp(this.doubleOneList) * 9;
        break;
      case 2:
        this.winList.push([
          'Double 2', this.checkSumUp(this.doubleTwoList) * 9
        ]);
        this.cash += this.checkSumUp(this.doubleTwoList) * 9;
        break;
      case 3:
        this.winList.push([
          'Double 3', this.checkSumUp(this.doubleThreeList) * 9
        ]);
        this.cash += this.checkSumUp(this.doubleThreeList) * 9;
        break;
      case 4:
        this.winList.push([
          'Double 4', this.checkSumUp(this.doubleFourList) * 9
        ]);
        this.cash += this.checkSumUp(this.doubleFourList) * 9;
        break;
      case 5:
        this.winList.push([
          'Double 5', this.checkSumUp(this.doubleFiveList) * 9
        ]);
        this.cash += this.checkSumUp(this.doubleFiveList) * 9;
        break;
      case 6:
        this.winList.push([
          'Double 6', this.checkSumUp(this.doubleSixList) * 9
        ]);
        this.cash += this.checkSumUp(this.doubleSixList) * 9;
        break;
      default:
        break;
    }

    // Check Sum
    switch (this.checkSumUp(sicboList)) {
      case 4:
        this.winList.push([
          'Sum 4', this.checkSumUp(this.list_4) * 51
        ]);
        this.cash += this.checkSumUp(this.list_4) * 51;
        break;
      case 5:
        this.winList.push([
          'Sum 5', this.checkSumUp(this.list_5) * 19
        ]);
        this.cash += this.checkSumUp(this.list_5) * 19;
        break;
      case 6:
        this.winList.push([
          'Sum 6', this.checkSumUp(this.list_6) * 15
        ]);
        this.cash += this.checkSumUp(this.list_6) * 15;
        break;
      case 7:
        this.winList.push([
          'Sum 7', this.checkSumUp(this.list_7) * 13
        ]);
        this.cash += this.checkSumUp(this.list_7) * 13;
        break;
      case 8:
        this.winList.push([
          'Sum 8', this.checkSumUp(this.list_8) * 9
        ]);
        this.cash += this.checkSumUp(this.list_8) * 9;
        break;
      case 9:
        this.winList.push([
          'Sum 9', this.checkSumUp(this.list_9) * 7
        ]);
        this.cash += this.checkSumUp(this.list_9) * 7;
        break;
      case 10:
        this.winList.push([
          'Sum 10', this.checkSumUp(this.list_10) * 7
        ]);
        this.cash += this.checkSumUp(this.list_10) * 7;
        break;
      case 11:
        this.winList.push([
          'Sum 11', this.checkSumUp(this.list_11) * 7
        ]);
        this.cash += this.checkSumUp(this.list_11) * 7;
        break;
      case 12:
        this.winList.push([
          'Sum 12', this.checkSumUp(this.list_12) * 7
        ]);
        this.cash += this.checkSumUp(this.list_12) * 7;
        break;
      case 13:
        this.winList.push([
          'Sum 13', this.checkSumUp(this.list_13) * 9
        ]);
        this.cash += this.checkSumUp(this.list_13) * 9;
        break;
      case 14:
        this.winList.push([
          'Sum 14', this.checkSumUp(this.list_14) * 13
        ]);
        this.cash += this.checkSumUp(this.list_14) * 13;
        break;
      case 15:
        this.winList.push([
          'Sum 15', this.checkSumUp(this.list_15) * 15
        ]);
        this.cash += this.checkSumUp(this.list_15) * 15;
        break;
      case 16:
        this.winList.push([
          'Sum 16', this.checkSumUp(this.list_16) * 19
        ]);
        this.cash += this.checkSumUp(this.list_16) * 19;
        break;
      case 17:
        this.winList.push([
          'Sum 17', this.checkSumUp(this.list_17) * 51
        ]);
        this.cash += this.checkSumUp(this.list_17) * 51;
        break;
      default:
        break;
    }

    // Check One
    const counts = {};
    sicboList.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    // console.table(counts);

    if (counts[1]) {
      this.winList.push([
        'Single 1', this.checkSumUp(this.singleOneList) * (counts[1] + 1)
      ]);
      this.cash += this.checkSumUp(this.singleOneList) * (counts[1] + 1);
    }
    if (counts[2]) {
      this.winList.push([
        'Single 2', this.checkSumUp(this.singleTwoList) * (counts[2] + 1)
      ]);
      this.cash += this.checkSumUp(this.singleTwoList) * (counts[2] + 1);
    }
    if (counts[3]) {
      this.winList.push([
        'Single 3', this.checkSumUp(this.singleThreeList) * (counts[3] + 1)
      ]);
      this.cash += this.checkSumUp(this.singleThreeList) * (counts[3] + 1);
    }
    if (counts[4]) {
      this.winList.push([
        'Single 4', this.checkSumUp(this.singleFourList) * (counts[4] + 1)
      ]);
      this.cash += this.checkSumUp(this.singleFourList) * (counts[4] + 1);
    }
    if (counts[5]) {
      this.winList.push([
        'Single 5', this.checkSumUp(this.singleFiveList) * (counts[5] + 1)
      ]);
      this.cash += this.checkSumUp(this.singleFiveList) * (counts[5] + 1);
    }
    if (counts[6]) {
      this.winList.push([
        'Single 6', this.checkSumUp(this.singleSixList) * (counts[6] + 1)
      ]);
      this.cash += this.checkSumUp(this.singleSixList) * (counts[6] + 1);
    }
  }

  resetAllList() {

    this.winList = [];

    // BIG / SMALL
    this.bigList = [];
    this.smallList = [];

    // Number
    this.list_4 = [];
    this.list_5 = [];
    this.list_6 = [];
    this.list_7 = [];
    this.list_8 = [];
    this.list_9 = [];
    this.list_10 = [];
    this.list_11 = [];
    this.list_12 = [];
    this.list_13 = [];
    this.list_14 = [];
    this.list_15 = [];
    this.list_16 = [];
    this.list_17 = [];

    // One
    this.singleOneList = [];
    this.singleTwoList = [];
    this.singleThreeList = [];
    this.singleFourList = [];
    this.singleFiveList = [];
    this.singleSixList = [];

    // Double
    this.doubleOneList = [];
    this.doubleTwoList = [];
    this.doubleThreeList = [];
    this.doubleFourList = [];
    this.doubleFiveList = [];
    this.doubleSixList = [];

    // Triple
    this.tripleList = [];
    this.tripleOneList = [];
    this.tripleTwoList = [];
    this.tripleThreeList = [];
    this.tripleFourList = [];
    this.tripleFiveList = [];
    this.tripleSixList = [];
  }

  addCash() {
    this.cash += 10000;
  }

  resetCash() {
    this.cash100.color = 'light';
    this.cash200.color = 'primary';
    this.cash500.color = 'secondary';
    this.cash1000.color = 'tertiary';
    this.cash2000.color = 'success';
    this.cash5000.color = 'warning';
    this.cash10000.color = 'danger';

    this.cash100.cashSelected = false;
    this.cash200.cashSelected = false;
    this.cash500.cashSelected = false;
    this.cash1000.cashSelected = false;
    this.cash2000.cashSelected = false;
    this.cash5000.cashSelected = false;
    this.cash10000.cashSelected = false;
  }

  click100() {
    this.resetCash();
    this.cash100.color = this.isSelected;
    this.cash100.cashSelected = true;
  }

  click200() {
    this.resetCash();
    this.cash200.color = this.isSelected;
    this.cash200.cashSelected = true;
  }

  click500() {
    this.resetCash();
    this.cash500.color = this.isSelected;
    this.cash500.cashSelected = true;
  }

  click1000() {
    this.resetCash();
    this.cash1000.color = this.isSelected;
    this.cash1000.cashSelected = true;
  }

  click2000() {
    this.resetCash();
    this.cash2000.color = this.isSelected;
    this.cash2000.cashSelected = true;
  }

  click5000() {
    this.resetCash();
    this.cash5000.color = this.isSelected;
    this.cash5000.cashSelected = true;
  }

  click10000() {
    this.resetCash();
    this.cash10000.color = this.isSelected;
    this.cash10000.cashSelected = true;
  }

  checkCashSelected() {
    if (this.cash100.cashSelected) {
      console.log('100');
      return 100;
    } else if (this.cash200.cashSelected) {
      console.log('200');
      return 200;
    } else if (this.cash500.cashSelected) {
      console.log('500');
      return 500;
    } else if (this.cash1000.cashSelected) {
      console.log('1000');
      return 1000;
    } else if (this.cash2000.cashSelected) {
      console.log('2000');
      return 2000;
    } else if (this.cash5000.cashSelected) {
      console.log('5000');
      return 5000;
    } else if (this.cash10000.cashSelected) {
      console.log('10000');
      return 10000;
    } else {
      console.log('0');
      return 0;
    }
  }

  onClickSmall() {
    console.log('SMALL');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.smallList.push(bet);
    }
    console.log(this.smallList);
  }

  onClickBig() {
    console.log('BIG');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.bigList.push(bet);
    } else {

    }
    console.log(this.bigList);
  }

  onClickTriple() {
    console.log('Triple');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.tripleList.push(bet);
    } else {

    }
    console.log(this.tripleList);
  }

  onClickTriple6() {
    console.log('Triple6');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.tripleSixList.push(bet);
    } else {

    }
    console.log(this.tripleSixList);
  }

  onClickTriple5() {
    console.log('Triple5');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.tripleFiveList.push(bet);
    } else {

    }
    console.log(this.tripleFiveList);
  }

  onClickTriple4() {
    console.log('Triple4');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.tripleFourList.push(bet);
    } else {

    }
    console.log(this.tripleFourList);
  }

  onClickTriple3() {
    console.log('Triple3');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.tripleThreeList.push(bet);
    } else {

    }
    console.log(this.tripleThreeList);
  }

  onClickTriple2() {
    console.log('Triple2');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.tripleTwoList.push(bet);
    } else {

    }
    console.log(this.tripleTwoList);
  }

  onClickTriple1() {
    console.log('Triple1');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.tripleOneList.push(bet);
    } else {

    }
    console.log(this.tripleOneList);
  }

  onClickDouble6() {
    console.log('Double6');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.doubleSixList.push(bet);
    } else {

    }
    console.log(this.doubleSixList);
  }

  onClickDouble5() {
    console.log('Double5');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.doubleFiveList.push(bet);
    } else {

    }
    console.log(this.doubleFiveList);
  }

  onClickDouble4() {
    console.log('Double4');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.doubleFourList.push(bet);
    } else {

    }
    console.log(this.doubleFourList);
  }

  onClickDouble3() {
    console.log('Double3');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.doubleThreeList.push(bet);
    } else {

    }
    console.log(this.doubleThreeList);
  }

  onClickDouble2() {
    console.log('Double2');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.doubleTwoList.push(bet);
    } else {

    }
    console.log(this.doubleTwoList);
  }

  onClickDouble1() {
    console.log('Double1');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.doubleOneList.push(bet);
    } else {

    }
    console.log(this.doubleOneList);
  }

  onClickList17() {
    console.log('list_17');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_17.push(bet);
    } else {

    }
    console.log(this.list_17);
  }

  onClickList16() {
    console.log('list_16');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_16.push(bet);
    } else {

    }
    console.log(this.list_16);
  }

  onClickList15() {
    console.log('list_15');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_15.push(bet);
    } else {

    }
    console.log(this.list_15);
  }

  onClickList14() {
    console.log('list_14');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_14.push(bet);
    } else {

    }
    console.log(this.list_14);
  }

  onClickList13() {
    console.log('list_13');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_13.push(bet);
    } else {

    }
    console.log(this.list_13);
  }

  onClickList12() {
    console.log('list_12');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_12.push(bet);
    } else {

    }
    console.log(this.list_12);
  }

  onClickList11() {
    console.log('list_11');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_11.push(bet);
    } else {

    }
    console.log(this.list_11);
  }

  onClickList10() {
    console.log('list_10');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_10.push(bet);
    } else {

    }
    console.log(this.list_10);
  }

  onClickList9() {
    console.log('list_9');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_9.push(bet);
    } else {

    }
    console.log(this.list_9);
  }

  onClickList8() {
    console.log('list_8');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_8.push(bet);
    } else {

    }
    console.log(this.list_8);
  }

  onClickList7() {
    console.log('list_7');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_7.push(bet);
    } else {

    }
    console.log(this.list_7);
  }

  onClickList6() {
    console.log('list_6');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_6.push(bet);
    } else {

    }
    console.log(this.list_6);
  }

  onClickList5() {
    console.log('list_5');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_5.push(bet);
    } else {

    }
    console.log(this.list_5);
  }

  onClickList4() {
    console.log('list_4');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.list_4.push(bet);
    } else {

    }
    console.log(this.list_4);
  }

  onClickSingle6() {
    console.log('singleSixList');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.singleSixList.push(bet);
    } else {

    }
    console.log(this.singleSixList);
  }
  onClickSingle5() {
    console.log('singleFiveList');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.singleFiveList.push(bet);
    } else {

    }
    console.log(this.singleFiveList);
  }
  onClickSingle4() {
    console.log('singleFourList');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.singleFourList.push(bet);
    } else {

    }
    console.log(this.singleFourList);
  }
  onClickSingle3() {
    console.log('singleThreeList');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.singleThreeList.push(bet);
    } else {

    }
    console.log(this.singleThreeList);
  }
  onClickSingle2() {
    console.log('singleTwoList');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.singleTwoList.push(bet);
    } else {

    }
    console.log(this.singleTwoList);
  }
  onClickSingle1() {
    console.log('singleOneList');
    const bet = this.checkCashSelected();
    const remain = this.cash - bet;
    if (remain >= 0) {
      this.cash = remain;
      this.singleOneList.push(bet);
    } else {

    }
    console.log(this.singleOneList);
  }
}
