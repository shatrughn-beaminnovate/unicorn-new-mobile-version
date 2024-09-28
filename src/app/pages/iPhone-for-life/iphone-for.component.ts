import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iphone-for',
  templateUrl: './iphone-for.component.html',
  styleUrls: ['./iphone-for.component.scss']
})
export class IphoneFor implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
  openPdfInNewTab() {
    const pdfUrl = '/assets/ipfl-pdf/icici-buyback-offer-Jan-24.pdf';
    window.open(pdfUrl, '_blank');
  }
}



