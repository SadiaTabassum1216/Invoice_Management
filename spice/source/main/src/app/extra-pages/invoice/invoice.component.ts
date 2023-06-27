import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent {
 
  itemList: Item[] = [];
  invoice: Invoice = new Invoice;
 
  isFormSubmitted = false;
  isModalOpen: boolean = false;
  uploadedFilePaths1: string[] = [];
  uploadedFilePaths2: string[] = [];
  uploadedFilePaths3: string[] = [];

  dialog?: MatDialogRef<ModalComponent>;
  selectedFiles1: FileList | null | undefined;
  selectedFiles2: FileList | null | undefined;
  selectedFiles: FileList | null | undefined;


  constructor(private http: HttpClient,  private dialogModel: MatDialog) {}



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
  
    this.itemList.push(newItem);
  }
  

  onFileSelect(event: any): void {
    this.selectedFiles = event.target.files;
  }
  

  uploadFiles(targetArray: File[]): void {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      console.log('No files to upload.');
      return;
    }
  
    const formData: FormData = new FormData();
  
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      targetArray.push(file);
      formData.append('files[]', file);
    }
  
    console.log('Files uploaded successfully');
   
    this.selectedFiles = null;
  }
  
  

  openModal(targetArray: File[]): void {
    this.dialog = this.dialogModel.open(ModalComponent, {
      width: '640px',
      disableClose: true,
      data: {
        filePaths: targetArray
      }
    });
  }


  submit() {
    this.isFormSubmitted = true;

    this.invoice.invoiceDate= new Date();

    this.invoice.totalCost = 0;
    this.invoice.subtotal = 0;     

    for (const item of this.itemList) {
      item.totalPrice = item.unitPrice*item.quantity + item.VAT + item.additionalCost + item.deliveryAdditionalCost + item.logisticCost;
      
      this.invoice.subtotal += item.firstPrice;
      this.invoice.totalCost += item.totalPrice;
    }

    this.invoice.itemList=this.itemList;
    console.log(this.invoice);


    this.http.post<any>('http://localhost:8000/api/invoice', this.invoice).subscribe(data => {
      console.log(this.invoice);
      this.invoice.invoiceID=data.id;
    });
  }


    breadscrums = [
      {
        title: 'Invoice',
        items: ['Extra'],
        active: 'Invoice',
      },
    ];


  }
