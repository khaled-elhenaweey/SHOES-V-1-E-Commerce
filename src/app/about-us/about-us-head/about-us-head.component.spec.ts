import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsHeadComponent } from './about-us-head.component';

describe('AboutUsHeadComponent', () => {
  let component: AboutUsHeadComponent;
  let fixture: ComponentFixture<AboutUsHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
