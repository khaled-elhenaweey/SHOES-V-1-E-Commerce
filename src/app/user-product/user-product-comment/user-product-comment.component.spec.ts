import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductCommentComponent } from './user-product-comment.component';

describe('UserProductCommentComponent', () => {
  let component: UserProductCommentComponent;
  let fixture: ComponentFixture<UserProductCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProductCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
