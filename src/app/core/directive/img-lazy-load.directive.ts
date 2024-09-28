import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[imgLazyLoad]'
})
export class ImgLazyLoadDirective implements AfterViewInit {
  @Input('imgLazyLoad') src!: string;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = this.el.nativeElement;
          img.src = this.src;
          observer.unobserve(img);
        }
      });
    });
    observer.observe(this.el.nativeElement);
  }
}