import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-week-highlights-Mac',
  templateUrl: './highlight-mac.component.html',
  styleUrls: ['./highlight-mac.component.scss']
})
export class HighlightMac implements OnInit {



  constructor(private commonService: CommonService,) { }
  // ngOnInit(): void {
  //   this.commonService.getData('best_seller').subscribe((result) => {
  //     this.bestsellersHolder = result;


  //   });
  // }
  ngOnInit(): void {

  }



}
