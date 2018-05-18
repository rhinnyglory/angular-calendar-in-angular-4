import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazorPayComponent } from './razor-pay.component';

describe('RazorPayComponent', () => {
  let component: RazorPayComponent;
  let fixture: ComponentFixture<RazorPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazorPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazorPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
