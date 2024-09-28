import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";
import { CommonService } from "../../core/services/common.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogHolder: any[] = [];
  imgUrl = environment.imgUrl;
  blogProducts: any[] = [];


  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {

    this.commonService.postRequest('blogs', {}).subscribe((res: any) => {
      console.log("blogs product :", res.data);
      this.blogProducts = res.data;
    });


    this.commonService.baseUrls$.subscribe((result) => {
      this.imgUrl = result?.asset_url?.s3_link || result?.asset_url?.fallback || environment.imgUrl;
    }, () => {
      this.imgUrl = environment.imgUrl;
    });
    this.blogHolder = [
      {
        title: 'First Blog Post',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis doloribus, ea ipsa libero maxime molestiae natus neque nesciunt nulla odio officia officiis omnis perferendis quaerat quam temporibus unde vel vero!'
      },
      {
        title: 'Second Blog Post',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis doloribus, ea ipsa libero maxime molestiae natus neque nesciunt nulla odio officia officiis omnis perferendis quaerat quam temporibus unde vel vero!'
      },
      {
        title: 'Third Blog Post',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis doloribus, ea ipsa libero maxime molestiae natus neque nesciunt nulla odio officia officiis omnis perferendis quaerat quam temporibus unde vel vero!'
      },
      {
        title: 'Fourth Blog Post',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis doloribus, ea ipsa libero maxime molestiae natus neque nesciunt nulla odio officia officiis omnis perferendis quaerat quam temporibus unde vel vero!'
      },
      {
        title: 'Fifth Blog Post',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis doloribus, ea ipsa libero maxime molestiae natus neque nesciunt nulla odio officia officiis omnis perferendis quaerat quam temporibus unde vel vero!'
      },
      {
        title: 'Sixth Blog Post',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis doloribus, ea ipsa libero maxime molestiae natus neque nesciunt nulla odio officia officiis omnis perferendis quaerat quam temporibus unde vel vero!'
      }
    ]
  }
}
