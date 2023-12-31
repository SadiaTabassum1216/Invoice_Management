import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Invoice } from 'src/app/models/invoice.model';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Invoice2 } from 'src/app/models/invoice2.model';
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

declare var require: any;
@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent {
  invoice: Invoice2=new Invoice2();
  dialogConfig?: MatDialogConfig;


  @ViewChild('toBePrinted')
  Print!: ElementRef;

  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog) {
    // console.log(data.invoice); 
    this.invoice=data.invoice;
    // console.log(this.invoice);
  }

  printInvoice(): void {
    // console.log(this.invoice);
    const toPrintContent = this.Print.nativeElement.innerHTML;
    const pdfContent = htmlToPdfmake(toPrintContent, { tableAutoSize: true });
  
  
  
    const pageSize = {
      width: 2200.00, // Page width in points (A4 size: 595.28 points)
      height: 600.00, // Page height in points (A4 size: 841.89 points)
    };
  
    const documentDefinition = {
      pageSize: pageSize,
      content: pdfContent
    };
  
    pdfMake.createPdf(documentDefinition).download('invoice.pdf');
  }
  
  close(){
    this.dialog.closeAll();
  }

 


}
