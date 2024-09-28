import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loadCount: number = 0;

  constructor() {
  }

  show() {
    this.loadCount += 1;
    let body = document.getElementsByTagName('body');
    body[0].style.pointerEvents = 'none';
    this.isLoading.next(true);
  }

  hide() {
    this.loadCount = (this.loadCount ? --this.loadCount : 0);
    if (!this.loadCount) {
      let body = document.getElementsByTagName('body');
      body[0].style.pointerEvents = 'unset';
      this.isLoading.next(false);
    }
  }
}
