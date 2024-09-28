import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../core/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  imgUrl = environment.imgUrl;
  blogDetailHolder:any=[];
  htmlContent: any;

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {

    // this.route.params.subscribe(params => {
    //   const slug = params['slug'];
    //   console.log("testing ", slug);

    // });

    this.commonService.baseUrls$.subscribe(
      (result) => {
        this.imgUrl =
          result?.asset_url?.s3_link ||
          result?.asset_url?.fallback ||
          environment.imgUrl;
      },
      () => {
        this.imgUrl = environment.imgUrl;
      }
    );
    this.route.paramMap.subscribe((resp: any) => {
      console.log('blogDetils : ', resp);
      this.getBlogDetails(resp.params.slug);
    });
  }

  getBlogDetails(slug: string) {
    this.commonService.getRequest(`blogs/${slug}`).subscribe((result) => {
      this.blogDetailHolder = result;
      console.log("blogDetails :", this.blogDetailHolder);

      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.blogDetailHolder.description);
      // this.htmlContent = this.blogDetailHolder.description;
    })
  }
}
