import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-sicbo',
  templateUrl: './sicbo.page.html',
  styleUrls: ['./sicbo.page.scss'],
})
export class SicboPage implements OnInit {

  X = 0;
  Y = 0;
  Z = 0;

  cash = 10000;

  sicboList = [];
  storeSicboList = [];

  // BIG / SMALL
  bigList = [];
  smallList = [];

  // Number
  fourList = [];
  fiveList = [];
  sixList = [];
  sevenList = [];
  eightList = [];
  nineList = [];
  tenList = [];
  elevenList = [];
  twelveList = [];
  thirteenList = [];
  fourteenList = [];
  fifteenList = [];
  sixteenList = [];
  seventeenList = [];

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

  public cash100: any = {color: 'light', cashSelected: false};
  public cash200: any = {color: 'primary', cashSelected: false};
  public cash500: any = {color: 'secondary', cashSelected: false};
  public cash1000: any = {color: 'tertiary', cashSelected: false};
  public cash2000: any = {color: 'success', cashSelected: false};
  public cash5000: any = {color: 'warning', cashSelected: false};
  public cash10000: any = {color: 'danger', cashSelected: false};

  public isSelected = 'dark';

  constructor() {}

  ngOnInit() {
    this.click100();
  }

  random(sicboList: any) {
    // const list = [];
    // sicboList.forEach(element => {
    //   element = Math.floor(Math.random() * 6) + 1;
    //   list.push(element);
    // });
    // return list;
  }

  throwDice() {
    this.sicboList = [];
    for (let i = 0; i < 3; i++) {
      this.sicboList.push(Math.floor(Math.random() * 6) + 1);
    }

    alert(this.sicboList + ' ' +
      this.checkTriple(this.sicboList) + ' ' +
      this.checkSumUp(this.sicboList) + ' ' +
      this.checkBig(this.sicboList)
    );

    this.storeSicboList.push(this.sicboList);
    console.table(this.storeSicboList);
  }

  checkTriple(sicboList) {

    // const allEqual = arr => arr.every(v => v === arr[0]);
    // allEqual([1, 1, 1, 1]);

    // one-liner
    // [1, 1, 1, 1].every( (val, i, arr) => val === arr[0] );

    const allEqual = arr => arr.every(v => v === arr[0]);
    return allEqual(sicboList);
  }

  checkSumUp(sicboList) {
    return sicboList.reduce((a, b) => a + b , 0);
  }

  checkBig(sicboList) {
    if (this.checkTriple(sicboList)) {
      return 'Triple';
    } else if (this.checkSumUp(sicboList) >= 11 && this.checkSumUp(sicboList) <= 17) {
      return 'BIG';
    } else if (this.checkSumUp(sicboList) >= 4 && this.checkSumUp(sicboList) <= 10) {
      return 'SMALL';
    }
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
    } else {
      alert('You dont have enough money');
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
      alert('You dont have enough money');
    }
    console.log(this.bigList);
  }

  onClickTriple6() {
    alert('Triple6');
  }

  onClickTriple5() {
    alert('Triple5');
  }

  onClickTriple4() {
    alert('Triple4');
  }

  onClickTriple3() {
    alert('Triple3');
  }

  onClickTriple2() {
    alert('Triple2');
  }

  onClickTriple1() {
    alert('Triple1');
  }

}
