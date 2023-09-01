import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { backendEnvironment } from 'src/environments/backendEnvironment';

@Component({
  selector: 'app-payment-view-modal',
  templateUrl: './payment-view-modal.component.html',
  styleUrls: ['./payment-view-modal.component.scss']
})
export class PaymentViewModalComponent {
invoices:any;
link: string= backendEnvironment.apiUrl;
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.invoices = data.invoice.payments;
    // console.log('Selected Invoice is: ', this.invoices);
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
