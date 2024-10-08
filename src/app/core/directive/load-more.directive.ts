import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[loadMore]'
})
export class LoadMoreDirective {

  @Output() scrollingFinished = new EventEmitter<void>();
  emitted = false;

  constructor() {
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !this.emitted) {
      this.emitted = true;
      this.scrollingFinished.emit();
    } else if (window.innerHeight + window.scrollY < document.body.offsetHeight) {
      this.emitted = false;
    }
  }

}
