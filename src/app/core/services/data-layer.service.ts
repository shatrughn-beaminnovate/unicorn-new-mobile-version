import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class DataLayerService {

  constructor(private location: Location, private titleService: Title) { }

  push(data: any) {
    if (data) {
      const fullPath = this.location.path(); // This will give you the path of the current route
      const fullUrl = window.location.origin + fullPath; // This will give you the full URL
      (window as any).dataLayer.push({ ecommerce: null }); // Clear the dataLayer before pushing new data
      let convertedData = {
        ...data,
        pagePath: fullUrl,
        pageTitle: this.titleService.getTitle(),
      };
      (window as any).dataLayer.push(convertedData);
      // console.log('DataLayer: ', convertedData);
      // console.log('DataLayer: ', (window as any).dataLayer);
    }
  }
}