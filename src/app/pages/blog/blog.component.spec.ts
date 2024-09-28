import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogComponent } from './blog.component';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ngOnInit populates blogHolder with an array of blog post objects
  it('should populate blogHolder with an array of blog post objects', function () {
    const component = new BlogComponent();
    component.ngOnInit();
    expect(component.blogHolder).toEqual([
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
    ]);
  });
});
