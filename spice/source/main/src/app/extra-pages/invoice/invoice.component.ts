import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent {
 
  items: Item[] = [];
  invoice: Invoice = new Invoice;
  // invaddress: any;
  isFormSubmitted = false;
  isModalOpen: boolean = false;
  uploadedFilePaths: string[] = [];


  constructor(private http: HttpClient) {}

  // getItemList() {
  //   this.http.get<any[]>('http://localhost:8000/api/invoice').subscribe(data => {
  //     this.invoiceList = data;
  //     console.log(this.invoiceList);
  //   });
  // }


  addRow() {
    let newItem: Item = {
      itemId: '',
      userId: '',
      UOMId: '',
      firstPrice: 0,
      lastPrice: 0,
      quantity: 0,
      VAT: 0,
      unitPrice: 0,
      additionalCost: 0,
      purchaseAdditionalCost: 0,
      deliveryAdditionalCost: 0,
      totalPrice: 0,
      POD: '',
      closingDate: new Date('Invalid Date'),
      purchasePrice: 0,
      isFirstPaymentDone: false,
      firstPaymentPrice: 0,
      firstPaymentDate: new Date('Invalid Date'),
      isLastPaymentDone: false,
      lastPaymentPrice: 0,
      lastPaymentDate:  new Date('Invalid Date'),
      logisticCompany: '',
      logisticLocation: '',
      logisticEstimatedDate: new Date('Invalid Date'),
      shippingStatus: '',
      isDeliveredToIraq: false,
      isDeliveredByLogistic: false,
      isDeliverToClient: false,
      logisticCost: 0,
      isFullyPaid: false,
      isSubmitted: false,
      status: '',
      
    };
  
    this.items.push(newItem);
  }
  


  // const fileInput = event.target as HTMLInputElement;
  // if (fileInput.files && fileInput.files.length > 0) {
  //   this.fhPhoto = fileInput.files[0];

  onFileSelect(event: any): void {
    const files: FileList = event.target.files;

    // Store the file paths
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.uploadedFilePaths.push(file.name);
    }
  }

  uploadFiles(): void {
    if (this.uploadedFilePaths.length === 0) {
      console.log('No files to upload.');
      return;
    }

    const formData: FormData = new FormData();

    for (let i = 0; i < this.uploadedFilePaths.length; i++) {
      const file = this.uploadedFilePaths[i];
      formData.append('files[]', file);
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  deleteFile(filePath: string): void {
    const index = this.uploadedFilePaths.indexOf(filePath);
    if (index !== -1) {
      this.uploadedFilePaths.splice(index, 1);
    }
  }

  redirectToPath(filePath: string): void {
    window.location.href = filePath;
  }


    submit() {
      this.isFormSubmitted = true;

      this.invoice.invoiceDate= new Date();

      this.invoice.totalCost = 0;
      this.invoice.subtotal = 0;     

      for (const item of this.items) {
        item.totalPrice = item.unitPrice*item.quantity + item.VAT + item.additionalCost + item.deliveryAdditionalCost + item.logisticCost;
        
        this.invoice.subtotal += item.firstPrice;
        this.invoice.totalCost += item.totalPrice;
      }

      this.invoice.itemList=this.items;
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
