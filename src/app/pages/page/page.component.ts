import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  content!: any;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    // Get Query Params from URL and pass it to API to get Page Data from DB and display it on the page using HTML
    this.route.paramMap.subscribe((resp: any) => {
      let slug = this.route.snapshot.params.slug;
      console.log('Params : ', slug);
      if (slug) {
        this.getPageData(slug);
      } else {
        this.router.navigate(['/']);
      }
    })
  }

  getPageData(slug: string) {
    this.commonService.getData('get_page/' + slug).subscribe((result) => {
      console.log('Page : ', result);
      if (result.status) {
        this.content = result.data.content;

        if (result.data.seo_title && result.data.seo_title !== '') {
          this.titleService.setTitle(result.data.seo_title + ' | Unicorn Store');
        } else {
          this.titleService.setTitle(result.data.title + ' | Unicorn Store');
        }

        // console.log("selected product meta: ", this.result.data.meta)
        if (result.data.meta && result.data.meta !== '') {
          // Create a new DOMParser
          const parser = new DOMParser();
          // Parse the meta string into a Document
          const parsed = parser.parseFromString(result.data.meta, 'text/html');
          // Get the meta tags from the parsed Document
          const metas = parsed.head.childNodes;
          console.log('metas : ', metas);

          // Iterate over each meta tag
          for (let i = 0; i < metas.length; i++) {
            const metaTag = metas[i] as HTMLMetaElement;

            if (metaTag.name) {
              // If a meta tag with the same name already exists, update it
              if (this.meta.getTag(`name='${metaTag.name}'`)) {
                this.meta.updateTag({ name: metaTag.name, content: metaTag.content });
              } else {
                // Otherwise, add a new meta tag
                this.meta.addTag({ name: metaTag.name, content: metaTag.content });
              }
              // After updating or adding, remove any duplicates
              this.removeDuplicateMetaTags(metaTag.name);
            }
          }
        } else {
          this.meta.updateTag({ name: 'keywords', content: result.data.title.split(' ').join(', ') });
          this.meta.updateTag({ name: 'description', content: result.data.title });
        }
      } else {
        // Redirect to 404 Page
        this.router.navigate(['/']);
      }
    });
  }

  // Function to remove duplicate meta tags, keeping only the latest
  removeDuplicateMetaTags(tagName: string) {
    const tags = this.meta.getTags(`name='${tagName}'`);
    if (tags.length > 1) {
      // Keep the first tag and remove the rest
      for (let i = 1; i < tags.length; i++) {
        this.meta.removeTagElement(tags[i]);
      }
    }
  }
}
