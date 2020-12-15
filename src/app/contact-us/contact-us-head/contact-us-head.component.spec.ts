import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsHeadComponent } from './contact-us-head.component';

describe('ContactUsHeadComponent', () => {
  let component: ContactUsHeadComponent;
  let fixture: ComponentFixture<ContactUsHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
