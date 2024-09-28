import { ComponentFactoryResolver, Directive, ElementRef, HostListener, Renderer2, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLazyLoadSection]'
})
export class LazyLoadSectionDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    
    if (this.shouldLoad()) {
      this.loadComponent();
    }
  }

  private shouldLoad(): boolean {
    const container = this.el.nativeElement;
    const containerBottom = container.getBoundingClientRect().bottom;
    const viewportHeight = window.innerHeight;
    return containerBottom <= viewportHeight;
  }

  private loadComponent(): void {
    console.log('scrolling: ', this.el.nativeElement);

    // Dynamic component loading logic
    // const factory = this.resolver.resolveComponentFactory(YourDynamicComponent);
    // const componentRef = this.viewContainerRef.createComponent(factory);

    // Optionally, you can pass input data to the dynamically loaded component
    // componentRef.instance.inputData = yourData;
  }

}
