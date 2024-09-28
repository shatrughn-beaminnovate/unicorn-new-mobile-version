import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-news-and-event',
  templateUrl: './news-and-event.component.html',
  styleUrls: ['./news-and-event.component.scss']
})
export class NewsAndEventComponent implements OnInit {
  news_EventlHolder:any = [];

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.postRequest(`allnews`, {}).subscribe((result) => {
      this.news_EventlHolder = result.items && result.items[0];;
      console.log("news_EventlHolder :", this.news_EventlHolder);

    });

  }
}
