import { Component, OnInit } from '@angular/core';
// declare const google: any;
@Component({
  selector: 'terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditions implements OnInit {
  selector(selector: any) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  ngOnInit(): void {
    // google.accounts.id.initialize({
    //   client_id: '788527991465-41ce4m06tfe1lkns1ukrggob357j4q3m.apps.googleusercontent.com',
    //   callback: (resp: any) => {
    //     console.log(resp)
    //   }
    // });
    // google.accounts.id.renderButton(document.getElementById("google-btn"), {
    //   theme: 'filled_blue',
    //   size: 'large',
    //   shape: 'rectangle',
    //   width: 50
    // })
  }
}
