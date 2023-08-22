import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { backendEnvironment } from 'src/environments/backendEnvironment';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent {
  paymentDone: boolean = false;
  dialogConfig?: MatDialogConfig;
  paymentAmount: number = 0;
  payment: any;


  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  submitPayment() {
    this.payment = {
      time: new Date(),
      amount: this.paymentAmount
    }
    this.http
      .post<any>(`${backendEnvironment.apiUrl}/api/payment`, this.payment)
      .subscribe((data) => {
        console.log(data);
      });

    this.dialog.closeAll();
  }
  closeModal() {
    this.dialog.closeAll();
  }
}
