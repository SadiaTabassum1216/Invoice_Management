import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentViewModalComponent } from './payment-view-modal.component';

describe('PaymentViewModalComponent', () => {
  let component: PaymentViewModalComponent;
  let fixture: ComponentFixture<PaymentViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentViewModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
