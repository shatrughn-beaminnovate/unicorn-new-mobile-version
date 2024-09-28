import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { DataLayerService } from 'src/app/core/services/data-layer.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  isLoading = false;
  isSubmitted = false;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private titleService: Title,
    private dataLayerService: DataLayerService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Contact Us | Unicornstore');
    this.fireGA4EventOnPageLoad();
    this.form = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      primary_phone: ['', [Validators.required]],
      secondary_phone: ['any'],
      how_did_you_hear: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      condition: [null, [Validators.required]],
    })
  }

  fireGA4EventOnPageLoad() {
    const fullPath = this.location.path(); // This will give you the path of the current route
    const fullUrl = window.location.origin + fullPath; // This will give you the full URL
    this.dataLayerService.push({
      'event': 'Pageview',
      'pagePath': fullUrl,
      'pageTitle': 'Contact Us | Unicornstore',
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true; // Set form submitted to true
    if (this.form.invalid) return; // If form is invalid then return
    this.isLoading = true; // Set loading to true

    // Make api call to submit the form
    this.commonService.postRequest('contact ', this.form.value).subscribe((res) => {
      this.isLoading = false; // Set loading to false after getting response
      // Check if response is success or not
      if ((res as any).status === "success") {
        // Show success message and on click of go to home redirect to home page
        Swal.fire({
          icon: 'success',
          html: `<h4>THANK YOU</h4><p>We have received your message. We'll reach you out immediately</p>`,
          showCancelButton: false,
          confirmButtonText: 'Go to Home',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']);
          }
        });
        this.isSubmitted = false;
        this.form.reset();
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: (res as any).message,
          timer: 2000,
        });
      }
    }, () => {
      this.isSubmitted = false;
      this.isLoading = false;
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Something went wrong! Please try after sometime',
        timer: 2000,
      });
    });
  }
}

export interface IContact {
  first_name: string;
  last_name: string;
  email: string;
  primary_phone: string;
  secondary_phone: string;
  how_did_you_hear: string;
  comment: string;
}
