import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { backendEnvironment } from 'src/environments/backendEnvironment';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent {
  invoice: Invoice=new Invoice();
  dialogConfig?: MatDialogConfig;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog, private http: HttpClient) {
    // console.log(data.invoice); 
    this.invoice=data.invoice;
    console.log(this.invoice);
  }
  

  addRow() {
    let newItem: Item = {
      itemId: ' ',
      userId: ' ',
      UOMId: ' ',
      firstPrice: 0,
      lastPrice: 0,
      quantity: 0,
      VAT: 0,
      unitPrice: 0,
      additionalCost: 0,
      purchaseAdditionalCost: 0,
      deliveryAdditionalCost: 0,
      totalPrice: 0,
      POD: ' ',
      closingDate: new Date('Invalid Date'),
      purchasePrice: 0,
      isFirstPaymentDone: false,
      firstPaymentPrice: 0,
      firstPaymentDate: new Date('Invalid Date'),
      isLastPaymentDone: false,
      lastPaymentPrice: 0,
      lastPaymentDate:  new Date('Invalid Date'),
      logisticCompany: ' ',
      logisticLocation: ' ',
      logisticEstimatedDate: new Date('Invalid Date'),
      shippingStatus: ' ',
      isDeliveredToIraq: false,
      isDeliveredByLogistic: false,
      isDeliverToClient: false,
      logisticCost: 0,
      isFullyPaid: false,
      isSubmitted: false,
      status: ' ',
      
      uploadedFiles1: [],
      uploadedFiles2: [],
      uploadedFiles3: []

    };
  
    this.invoice.itemList.push(newItem);
  }
  
  update() {
    this.http.put<any>(`${backendEnvironment.apiUrl}/api/invoice/${this.invoice.invoiceID}`, this.invoice).subscribe(data => {
  console.log(this.invoice);
});
    this.dialog.closeAll();
  }
  
  close(){
    this.dialog.closeAll();
  }

}
