import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnInit {

  @Input() imageLoading: boolean = true;
  @Input() imageLoaded: boolean = false;
  @Input() imageUrl: string = '';
  @Input() imageLoadingUrl: string = 'assets/img/loader/3.gif';
  @Input() noImageUrl: string = 'assets/img/not-found/no-image-found.png';
  @Input() alt: string = 'Image Not Available';
  @Input() imageId: string = '';
  @Input() imageClass: string = '';
  @Input() imageContainerHeight: string = '';
  @Input() imageContainerWidth: string = '';
  @Input() imageContainerClass: string = '';
  @Input() id!: string;
  isLoadingImageExists: boolean = true;

  constructor(private cd: ChangeDetectorRef, private http: HttpClient) { }

  ngOnInit(): void {
    this.checkAppFileExists(this.imageLoadingUrl).subscribe(exists => {
      this.isLoadingImageExists = exists;
    });
  }

  checkAppFileExists(filePath: string): Observable<boolean> {
    return this.http.get(filePath, { responseType: 'text' }).pipe(
      map(response => true), // File exists
      catchError(error => of(false)) // File doesn't exist or error occurred
    );
  }

  onImageLoaded() {
    this.imageLoading = false;
  }

  handleEmptyImage() {
    console.log('Image not found');
    this.imageLoading = false;
    if (this.isLoadingImageExists) {
      this.imageUrl = this.noImageUrl;
    }
  }
}
