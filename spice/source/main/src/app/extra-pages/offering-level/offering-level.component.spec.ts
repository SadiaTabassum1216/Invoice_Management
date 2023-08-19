import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingLevelComponent } from './offering-level.component';

describe('OfferingLevelComponent', () => {
  let component: OfferingLevelComponent;
  let fixture: ComponentFixture<OfferingLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferingLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferingLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
