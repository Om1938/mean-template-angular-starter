import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XyzAppComponent } from './xyz-app.component';

describe('XyzAppComponent', () => {
  let component: XyzAppComponent;
  let fixture: ComponentFixture<XyzAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XyzAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XyzAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
