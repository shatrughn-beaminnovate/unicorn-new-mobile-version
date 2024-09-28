import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-personal-shopper',
  templateUrl: './personal-shopper.component.html',
  styleUrls: ['./personal-shopper.component.scss']
})
export class PersonalShopperComponent implements OnInit {
  consultationType = 'Phone';
  steps: string = 'consultation-type';

  constructor() {
  }

  ngOnInit(): void {
  }

  nextStep(step: string) {
    console.log('Step Name : ', step);
    if (step === 'consultation-type') {
      this.steps = 'consultation-type';
    }
    if (step === 'book-appointment') {
      this.steps = 'book-appointment';
    }
    if (step === 'submit-details') {
      this.steps = 'submit-details';
    }
    if (step === 'finish') {
      this.steps = 'finish';
    }
  }

  onClickConsultationType(type: string) {
    if (type === 'phone') {
      this.consultationType = 'Phone';
    } else {
      this.consultationType = 'Video';
    }
  }
}
