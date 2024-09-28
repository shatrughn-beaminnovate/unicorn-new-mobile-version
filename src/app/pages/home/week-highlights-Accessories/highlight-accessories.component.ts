import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-week-highlights-accessories',
  templateUrl: './highlight-accessories.component.html',
  styleUrls: ['./highlight-accessories.component.scss']
})
export class HighlightAccessories implements OnInit {


  bestsellersHolder: any;
  imgUrl = environment.imgUrl;

  constructor(private commonService: CommonService,) { }
  // ngOnInit(): void {
  //   this.commonService.getData('best_seller').subscribe((result) => {
  //     this.bestsellersHolder = result;


  //   });
  // }
  ngOnInit(): void {
    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
  }
}
