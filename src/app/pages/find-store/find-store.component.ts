import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from "../../core/services/common.service";
import { Subscription } from "rxjs";
import { Loader } from "@googlemaps/js-api-loader";
import { DomSanitizer, Title } from "@angular/platform-browser";
import { IStores } from './store-model';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-find-store',
  templateUrl: './find-store.component.html',
  styleUrls: ['./find-store.component.scss']
})

export class FindStoreComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription = new Subscription();
  storesHolder: IStores[] = [];
  state!: string;
  city!: string;
  locations: ILocations[] = [];
  isViewLocation = false;
  mapSrc!: any;
  stateHolder: any[] = [];
  cityHolder: any[] = [];

  constructor(
    private commonService: CommonService,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private dataLayerService: DataLayerService,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getStatesOfAllStores();
    this.fireGA4EventOnPageLoad();
  }

  fireGA4EventOnPageLoad() {
    const fullPath = this.location.path(); // This will give you the path of the current route
    const fullUrl = window.location.origin + fullPath; // This will give you the full URL
    this.dataLayerService.push({
      'event': 'Pageview',
      'pagePath': fullUrl,
      'pageTitle': 'Find Store | Unicornstore',
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.titleService.setTitle('Find Store | Unicornstore');
    });
  }

  getStatesOfAllStores() {
    this.subscription.add(this.commonService.postRequest('stores/get_all_states', {})?.subscribe((result) => {
      console.log('Stores : ', result);
      if (result) {
        this.stateHolder = result.data;
      }
    })
    );
  }

  getCitiesOfStateOfStore(state: string) {
    this.commonService.postRequest('stores/get_all_states', { state: state }).subscribe((result) => {
      console.log('Stores : ', result);
      if (result) {
        this.cityHolder = result.data;
      }
    });
  }

  onStateChange(event: any) {
    this.state = event.target[event.target.options.selectedIndex].text;
    this.storesHolder = [];
    this.locations = [];
    this.getCitiesOfStateOfStore(this.state);
  }

  onCityChange(event: any) {
    this.city = event.target[event.target.options.selectedIndex].text;
    this.subscription = this.commonService.getData(`store?state=${this.state}&city=${this.city}`).subscribe((result) => {
      console.log('Stores : ', result);
      if (result) {
        this.storesHolder = result;
        this.locations = [];
        this.storesHolder.forEach((item) => {
          this.locations.push({
            latitude: item.latitude,
            longitude: item.longitude,
            locationName: item.store_name
          })
        });
        this.loadMap();
      }
    })
  }

  viewLocation(src: any) {
    console.log('Click on View Location');
    this.isViewLocation = true;
    this.mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(src);
  }

  loadMap() {
    let map: google.maps.Map;
    let bounds = new google.maps.LatLngBounds();
    let loader = new Loader({
      apiKey: 'AIzaSyAYlBRLJPLiJjprCobQwdGZ0u-CdDHZxYQ'
    });
    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById('map') as HTMLElement);
      // loop through each object of your locations array
      for (let location of this.locations) {
        let latLng = { lat: Number(location.latitude), lng: Number(location.longitude) };
        // Set the position and title
        let marker: any = new google.maps.Marker({
          position: latLng,
          title: location.locationName
        });

        // place marker in map
        marker.setMap(map);
        let loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
        bounds.extend(loc);
        map.fitBounds(bounds);
        map.panToBounds(bounds);
      }
    });

  }


  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

export interface ILocations {
  latitude: string;
  longitude: string;
  locationName: string
}


