import { BuddhaService } from '../../services/buhha/buddha.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private buddhaService: BuddhaService
  ) { }

  ngOnInit() {
    // Get the ID that was passed with the URL
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
 
    // Get the information from the API
    this.buddhaService.getHtml(this.id).subscribe(result => {
      // console.log(result)
      this.html = result;
    });
  }

}
