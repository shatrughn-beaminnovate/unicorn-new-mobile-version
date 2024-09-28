import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';

import { PageComponent } from './page.component';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let commonService: CommonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageComponent],
      imports: [HttpClientModule, RouterTestingModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    commonService = TestBed.inject(CommonService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Should set content property with correct value when API returns successful response
  it('should set content property with correct value when API returns successful response', function () {
    spyOn(commonService, 'getData').and.returnValue(of({ status: true, data: { content: 'test-content' } }));
    component.getPageData('test-slug');
    expect(component.content).toEqual('test-content');
  });
});
