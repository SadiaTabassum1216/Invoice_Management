import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPComponent } from './edit-p.component';

describe('EditPComponent', () => {
  let component: EditPComponent;
  let fixture: ComponentFixture<EditPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
