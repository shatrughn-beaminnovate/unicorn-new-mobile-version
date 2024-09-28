import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-week-highlights-Newin',
  templateUrl: './highlight-new-in.component.html',
  styleUrls: ['./highlight-new-in.component.scss']
})
export class HighlightNewIn implements OnInit {

  bestsellersHolder: any;

  constructor(private commonService: CommonService,) { }
  // ngOnInit(): void {
  //   this.commonService.getData('best_seller').subscribe((result) => {
  //     this.bestsellersHolder = result;


  //   });
  // }
  ngOnInit(): void {

  }



}
