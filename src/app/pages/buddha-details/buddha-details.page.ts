import {
  BuddhaService
} from '../../services/buhha/buddha.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  UtilsService
} from '../../services/utils/utils.service';
import {
  Platform,
  IonInfiniteScroll
} from '@ionic/angular';

@Component({
  selector: 'app-buddha-details',
  templateUrl: './buddha-details.page.html',
  styleUrls: ['./buddha-details.page.scss'],
})
export class BuddhaDetailsPage implements OnInit {

  html: any;
  id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private buddhaService: BuddhaService,
    public utilsService: UtilsService,
    public platform: Platform
  ) {}

  ngOnInit() {
    // Get the ID that was passed with the URL
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.platform.is('cordova')) {
      this.buddhaService.getHtmlNative(this.id).then(html => {
        this.html = html;
      });
    } else {
      // Get the information from the API
      this.buddhaService.getHtml(this.id).subscribe(html => {
        this.html = html;
      });
    }
  }

}