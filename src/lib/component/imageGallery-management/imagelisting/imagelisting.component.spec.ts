import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagelistingComponent } from './imagelisting.component';

describe('ImagelistingComponent', () => {
  let component: ImagelistingComponent;
  let fixture: ComponentFixture<ImagelistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagelistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagelistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
