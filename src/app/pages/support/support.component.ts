import { Component, ElementRef, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import { Location } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {


  locations = [
    {
      name: 'Mumbai',
      subLocations: [
        { id: 1, name: 'Andheri West' },
        { id: 2, name: 'Kalyan Store' },
        { id: 3, name: 'Colaba' },
        { id: 22, name: 'Malad' },

        { id: 203, name: 'Nallasopara' },
        { id: 2030, name: 'Ichalkaranji (RDO)' },
        { id: 2000, name: 'Ahmednagar (RDO)' },


      ], collapsed: true,

    },
    {
      name: 'Pune',
      subLocations: [
        { id: 4, name: 'Shivaji Nagar JM Rd' },
        { id: 5, name: 'Viman Nagar' },
        { id: 6, name: 'Aundh' },
        { id: 7, name: 'MG Road' },
        { id: 24, name: 'Baner' },
        { id: 404, name: ' Hinjewadi' },
        { id: 202, name: 'Jalna' },

      ],
    },
    {
      name: 'Goa',
      subLocations: [
        { id: 100, name: 'Margoa' },

      ], collapsed: true,

    },
    {
      name: 'Delhi/NCR',
      subLocations: [
        { id: 8, name: 'Pacific Mall' },
        // { id: 26, name: 'Pacific Mall Flagship' },
        { id: 12, name: 'Defence Colony' },
        { id: 13, name: 'Malviya Nagar' },
      ],
    },
    {
      name: 'Haryana',
      subLocations: [
        { id: 9, name: 'One Horizon' },
        { id: 10, name: 'DLF Cyber City' },
        // { id: 27, name: 'DLF Cyber Flagship' },
        { id: 11, name: 'Crown Interiorz - Faridabad' },
        { id: 111, name: 'Kaithal' },
      ],
    },
    {
      name: 'UP Zone',
      subLocations: [
        { id: 14, name: 'Hazratganj - Lucknow' },
        { id: 23, name: 'One Awadh- Lucknow' },
        { id: 2008, name: 'Raebareli' },
        { id: 21, name: 'DLF Mall of India - Noida' },
        { id: 28, name: 'Agra' },
        { id: 288, name: 'Varanasi' },


      ],
    },
    {
      name: 'Punjab',
      subLocations: [{ id: 15, name: 'Patiala' },
      { id: 155, name: 'Mohali' }
      ],
    },
    {
      name: 'Chandigarh',
      subLocations: [{ id: 16, name: 'Chandigarh' }],
    },
    {
      name: 'Gujarat',
      subLocations: [
        { id: 17, name: 'Himalaya Mall-Ahmedabad' },
        { id: 18, name: 'Devarc Mall-Ahmedabad' },
        { id: 19, name: 'Ashram Road' },
        { id: 20, name: 'Eva Mall Vadodara' },
        // { id: 25, name: 'Ahmedabad One Mall - ahmedabad' },
        { id: 98, name: 'Rajkot' },
        { id: 289, name: 'Alpha One' },
        { id: 2890, name: 'Junagadh (RDO)' }

      ],
    },
    {
      name: 'Uttarakhand',
      subLocations: [
        { id: 255, name: 'Roorkee' },
      ],
    },
  ];

  aboveUsedIds: any = [1, 2, 3, 22, 202, 203, 4, 5, 6, 7, 24, 100, 8, 12, 13, 9, 10, 11, 111, 14, 23, 21, 28, 288, 15, 155, 16, 17, 18, 19, 20, 25, 98, 255];

  renderer: any;
  activeSubLocationId: number | null = null;
  activeLocation: any = null;

  constructor(
    private el: ElementRef,
    private titleService: Title,
    private dataLayerService: DataLayerService,
    private location: Location
  ) {
    this.activeSubLocationId = 1;
  }

  ngOnInit(): void {
    this.titleService.setTitle('Support | Unicornstore');
    this.fireGA4EventOnPageLoad();
  }

  fireGA4EventOnPageLoad() {
    const fullPath = this.location.path(); // This will give you the path of the current route
    const fullUrl = window.location.origin + fullPath; // This will give you the full URL
    this.dataLayerService.push({
      'event': 'Pageview',
      'pagePath': fullUrl,
      'pageTitle': 'Support | Unicornstore',
    });
  }

  toggleCollapse(location: any) {
    if (this.activeLocation === location) {
      this.activeLocation = null;
    } else {
      this.activeLocation = location;
    }
  }

  isLocationCollapsed(location: any): boolean {
    return this.activeLocation !== location;
  }

  showLocationDetails(subLocationId: number) {
    this.activeSubLocationId = subLocationId;
    const element = this.el.nativeElement.querySelector(`#location_content_${subLocationId}`);
    if (element) {
      const subLocationElements = this.el.nativeElement.querySelectorAll('[id^="location_content_"]');
      subLocationElements.forEach((subElement: { id: string; style: { display: string; }; }) => {
        if (subElement.id === `location_content_${subLocationId}`) {
          if (subElement.style.display !== 'block') {
            subElement.style.display = 'block';
          }
        } else {
          subElement.style.display = 'none';
        }
      });
    }
  }

  isAnySubLocationActive(location: any): boolean {
    return location.subLocations.some((subLocation: { id: number | null; }) => subLocation.id === this.activeSubLocationId);
  }

  isSubLocationActive(subLocationId: number): boolean {
    return this.activeSubLocationId === subLocationId;
  }

}



