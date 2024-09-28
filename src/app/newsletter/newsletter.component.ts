import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../core/services/common.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  isNewsLetterSubmitted: boolean = false;
  displayModal: boolean = false;
  newsletterForm!: FormGroup;
  newsLetterSubscribed = { status: false, message: '', email: '' }
  showSubscribe: boolean = false;


  constructor(private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private commonService: CommonService, private messageService: MessageService) { }

  ngOnInit(): void {
    let emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    this.newsletterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]]
    });

    let newsLetterSubscribed = JSON.parse(localStorage.getItem('newsLetterSubscribed')!);

    if (newsLetterSubscribed && newsLetterSubscribed.status === true) {
      this.newsLetterSubscribed = newsLetterSubscribed;
    }

  }

  get f() {
    return this.newsletterForm.controls;
  }

  showDialog() {
    this.displayModal = false;
    // if you want to show news letter then true here 
    // Manually trigger change detection
    this.cdr.detectChanges();
  }


  newsletter_products = [
    {
      product_img: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/327eb5e3d3f6926684347d77bb0977dc.jpg',
      product_name: 'iphone 14',
      product_price: '69900',
      product_sell_price: '64308'
    },
    {
      product_img: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/4989905a06fe4cf49d007028e0bc229d.jpeg',
      product_name: 'iPhone 13 Pro Silicone Case with MagSafe',
      product_price: '4610',
      product_sell_price: '4410'
    },
    {
      product_img: 'https://s3.ap-south-1.amazonaws.com/shop.unicorn/medium/1e720b9e559102b9756ec66ca83846ad.jpeg',
      product_name: 'Apple Watch Series 8',
      product_price: '49500',
      product_sell_price: '43605'
    }

  ]

  subscribe() {
    this.isNewsLetterSubmitted = true;

    if (this.newsletterForm.invalid) {
      return;
    }

    let subscribePayload = {
      email: this.newsletterForm.value.email,
    };
    console.log("outside post subscribe")
    this.commonService.postRequest('newsletter_subscribers', subscribePayload).subscribe((res: any) => {
      this.isNewsLetterSubmitted = false;
      if (res.status === true) {
        this.messageService.add({ severity: 'success', detail: 'subscribe successfull' });
        this.newsLetterSubscribed.status = true;
        this.newsLetterSubscribed.message = res.message || 'You have successfully subscribed to our newsletter.';
        this.newsLetterSubscribed.email = this.newsletterForm.value.email;
        localStorage.setItem('newsLetterSubscribed', JSON.stringify(this.newsLetterSubscribed));
        this.newsletterForm.reset();

      } else {
        this.messageService.add({ severity: 'error', detail: res.message || 'Login failed' });
        this.newsLetterSubscribed.status = false;
        this.newsLetterSubscribed.message = res.message || 'Something went wrong. Please try again later.';
        localStorage.setItem('newsLetterSubscribed', JSON.stringify(this.newsLetterSubscribed));
      }
    });

  }


  handleCheckboxChange() {
    // Update localStorage when the checkbox changes
    localStorage.setItem('showSubscribe', this.showSubscribe.toString());
  }



}
