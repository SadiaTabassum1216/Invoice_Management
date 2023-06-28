import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Invoice } from 'src/app/models/invoice.model';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent {
  invoice: Invoice=new Invoice();
  dialogConfig?: MatDialogConfig;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog) {
    console.log(data.invoice); 
    this.invoice=data.invoice;
    console.log(this.invoice);
  }
  
  close(){
    this.dialog.closeAll();
  }

}
