import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import {
  NavParams
} from '@ionic/angular';

@Component({
  selector: 'app-sicbo-result',
  templateUrl: './sicbo-result.page.html',
  styleUrls: ['./sicbo-result.page.scss'],
})
export class SicboResultPage implements OnInit {

  // Data passed in by componentProps
  @Input() first: string;
  @Input() second: string;
  @Input() third: string;


  public dice_array = [
    {index: 1, src: '../../assets/img/dice_1.png'},
    {index: 2, src: '../../assets/img/dice_2.png'},
    {index: 3, src: '../../assets/img/dice_3.png'},
    {index: 4, src: '../../assets/img/dice_4.png'},
    {index: 5, src: '../../assets/img/dice_5.png'},
    {index: 6, src: '../../assets/img/dice_6.png'},
  ];

  public dice1;
  public dice2;
  public dice3;

  constructor(
    public navParams: NavParams
  ) {}

  ngOnInit() {
    // componentProps can also be accessed at construction time using NavParams
    // console.log(
    //   this.navParams.get('first'),
    //   this.navParams.get('second'),
    //   this.navParams.get('third')
    // );

    if (this.navParams.get('first')) {
      this.dice1 = this.dice_array[this.navParams.get('first') - 1].src;
    }
    if (this.navParams.get('second')) {
      this.dice2 = this.dice_array[this.navParams.get('second') - 1].src;
    }
    if (this.navParams.get('third')) {
      this.dice3 = this.dice_array[this.navParams.get('third') - 1].src;
    }
  }

}
