import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseLevelComponent } from './purchase-level.component';

describe('PurchaseLevelComponent', () => {
  let component: PurchaseLevelComponent;
  let fixture: ComponentFixture<PurchaseLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
