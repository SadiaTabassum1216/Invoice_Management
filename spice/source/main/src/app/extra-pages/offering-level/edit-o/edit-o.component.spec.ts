import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOComponent } from './edit-o.component';

describe('EditOComponent', () => {
  let component: EditOComponent;
  let fixture: ComponentFixture<EditOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditOComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
