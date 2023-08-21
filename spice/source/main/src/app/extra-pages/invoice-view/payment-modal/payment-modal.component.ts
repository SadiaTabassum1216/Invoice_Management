import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent {
  paymentDone: boolean = false;
  dialogConfig?: MatDialogConfig;

  constructor(
     public dialog: MatDialog,
     @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  submitPayment() {
    // Perform payment submission logic here
    // Update the invoice's payment status based on this.paymentDone

    this.dialog.closeAll();
  }
  closeModal(){
    this.dialog.closeAll();
  }
}
