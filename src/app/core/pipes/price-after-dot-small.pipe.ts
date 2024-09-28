import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceAfterDotSmall'
})
export class PriceAfterDotSmallPipe implements PipeTransform {

  constructor() { }

  transform(price: string | null): any {
    let returnVal = null;
    if (price) {
      let priceArr = String(price).split('.');
      if (!priceArr[1]) {
        returnVal = `${priceArr[0]}<span class="price-last-two-char">.00</span>`;
      } else {
        returnVal = `${priceArr[0]}<span class="price-last-two-char">.${priceArr[1]}</span>`;
      }
    }
    return returnVal;
  }
}
