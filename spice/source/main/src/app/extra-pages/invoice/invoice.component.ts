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
 
  items: Item[] = [];
  invoice: Invoice = new Invoice;
  invaddress: any;
  isFormSubmitted = false;
<<<<<<< Updated upstream

  discountPercentage = 0.05;
  taxPercentage = 0.1;



  constructor(private http: HttpClient) {
    this.invaddress = {};
   
  }
=======
  isModalOpen: boolean = false;
  uploadedFilePaths1: string[] = [];
  uploadedFilePaths2: string[] = [];
  uploadedFilePaths3: string[] = [];

  dialog?: MatDialogRef<ModalComponent>;
  selectedFiles1: FileList | null | undefined;
  selectedFiles2: FileList | null | undefined;
  selectedFiles: FileList | null | undefined;


  constructor(private http: HttpClient,  private dialogModel: MatDialog) {}
>>>>>>> Stashed changes

  // getItemList() {
  //   this.http.get<any[]>('http://localhost:8000/api/items').subscribe(data => {
  //     this.items = data;
  //     console.log(this.items);
  //   });
  // }


  addRow() {
    let newItem: Item = {
      itemId: '',
      firstPrice: 0,
      lastPrice: 0,
      quantity:0,
      VAT: 0,
      unitPrice: 0,
      additionalCost: 0,
      purchaseAdditionalCost: 0,
      deliveryAdditionalCost: 0,
      totalPrice: 0,
      POD: '',
      closingDate:new Date() ,
      purchasePrice: 0,
      isFirstPaymentDone: false,
<<<<<<< Updated upstream
      firstPaymentDate:new Date(),
      isLastPaymentDone: false,
=======
      firstPaymentPrice: 0,
      firstPaymentDate: new Date(),
      isLastPaymentDone: false,
      lastPaymentPrice: 0,
      lastPaymentDate: new Date(),
>>>>>>> Stashed changes
      logisticCompany: '',
      logisticLocation: '',
      logisticEstimatedDate: new Date(),
      shippingStatus: '',
      isDeliveredToIraq: false,
      isDeliveredByLogistic: false,
      isDeliverToClient: false,
      logisticCost: 0,
      isFullyPaid: false,
      isSubmitted: false,
<<<<<<< Updated upstream
      status: ''
=======
      status: '',
      uploadedFiles1: [],
      uploadedFiles2: [],
      uploadedFiles3: []
>>>>>>> Stashed changes
    };
  
    this.items.push(newItem);
  }
  

<<<<<<< Updated upstream
=======
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


>>>>>>> Stashed changes
    submit() {
      this.isFormSubmitted = true;
       console.log(this.items);
       this.invoice.invoiceDate= new Date();

      this.invoice.totalCost = 0;
      for (const item of this.items) {
        item.totalPrice = item.unitPrice* item.quantity +item.lastPrice + item.additionalCost + item.deliveryAdditionalCost;
        console.log(item.totalPrice);
        this.invoice.totalCost += item.totalPrice;
      }

      // this.invoice.discount = this.invoice.subtotal * this.discountPercentage;
      // this.invoice.tax = this.invoice.subtotal * this.taxPercentage;
      // this.invoice.totalCost = this.invoice.subtotal - this.invoice.discount + this.invoice.tax;

      this.http.post<any>('http://localhost:8000/api/user', this.invoice).subscribe(data => {
        console.log(this.invoice);
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
