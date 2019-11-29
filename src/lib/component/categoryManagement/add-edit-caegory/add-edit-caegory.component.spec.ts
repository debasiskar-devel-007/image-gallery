import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCaegoryComponent } from './add-edit-caegory.component';

describe('AddEditCaegoryComponent', () => {
  let component: AddEditCaegoryComponent;
  let fixture: ComponentFixture<AddEditCaegoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditCaegoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCaegoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
