import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { AuthService } from 'src/app/core/service/auth.service';
import { backendEnvironment } from 'src/environments/backendEnvironment';

declare var require: any;

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
// import { User } from 'src/app/core/models/user';
import { User } from 'src/app/models/user.model';
import { AuthUser } from 'src/app/core/models/user';
const htmlToPdfmake = require('html-to-pdfmake');
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  @ViewChild('toPrint')
  toPrint!: ElementRef;

  itemList: Item[] = [];
  invoice: Invoice = new Invoice();
  itemName: string[] = ['apple', 'banana', 'grape'];

  isFormSubmitted = false;
  isModalOpen: boolean = false;
  uploadedFilePaths1: string[] = [];
  uploadedFilePaths2: string[] = [];
  uploadedFilePaths3: string[] = [];
  files: File[] = [];

  dialog?: MatDialogRef<ModalComponent>;
  selectedFiles1: FileList | null | undefined;
  selectedFiles2: FileList | null | undefined;
  selectedFiles: FileList | null | undefined;

  public currentUser: Observable<AuthUser> | undefined;
  name: string = '';
  id: number = 0;
  items: Item[] = [];

  constructor(
    private http: HttpClient,
    private dialogModel: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.currentUser.subscribe((info) => {
      this.name = info['user']['name'];
      this.id = info['user']['id'];
      // console.log("Current user id ",  this.id);
    });
    this.getItemList();
  }

  getItemList() {
    this.http
      .get<any[]>(`${backendEnvironment.apiUrl}/api/items`)
      .subscribe((data) => {
        this.items = data;
        console.log(this.items);
        // this.itemName = this.items.map(item => item.itemId);
        console.log('items: ', this.itemName);
      });
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
      lastPaymentDate: new Date('Invalid Date'),
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
      uploadedFiles3: [],
    };

    this.itemList.push(newItem);
  }

  // onFileSelect(event: any): void {
  //   this.files = event.target.files;
  // }

  // uploadFiles(targetArray: File[]): void {
  //   // if (!this.selectedFiles || this.selectedFiles.length === 0) {
  //   //   console.log('No files to upload.');
  //   //   return;
  //   // }

  //   const formData: FormData = new FormData();

  //   for (let i = 0; i < this.files.length; i++) {
  //     const file = this.files[i];
  //     targetArray.push(file);
  //     formData.append('files[]', file);
  //   }

  //   console.log('Files uploaded successfully');
  //   console.log(targetArray);

  //   this.selectedFiles = null;
    

  //   // this.http.post('https://tmb.kreatedev.com/api/api/invoice', formData).subscribe(
  //   //   data => {
  //   //     console.log(data);
  //   //   }
  //   // );
  // }
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
        filePaths: targetArray,
      },
    });
  }

  export(): void {
    const toPrintContent = this.toPrint.nativeElement.innerHTML;
    const pdfContent = htmlToPdfmake(toPrintContent, { tableAutoSize: true });
    const documentDefinition = { content: pdfContent };
    pdfMake.createPdf(documentDefinition).download('newinvoice.pdf');
  }

  submit() {
    // this.isFormSubmitted = true;

    this.invoice.invoiceDate = new Date();

    this.invoice.totalCost = 0;
    this.invoice.subtotal = 0;
    this.invoice.grandTotal = 0;

    for (const item of this.itemList) {
      item.totalPrice =
        item.unitPrice * item.quantity +
        item.VAT +
        item.additionalCost +
        item.deliveryAdditionalCost;

      this.invoice.subtotal += item.firstPrice;
      this.invoice.totalCost += item.totalPrice;
      this.invoice.grandTotal += this.invoice.totalCost + item.logisticCost;
    }

    this.invoice.itemList = this.itemList;
    console.log(this.invoice);

    const formData: FormData = new FormData();
    formData.append('invoiceID', this.invoice.invoiceID);
    formData.append('invoiceDate', this.invoice.invoiceDate.toISOString());
    formData.append(
      'invoiceEstimatedDate',
      this.invoice.invoiceEstimatedDate.toString()
    );
    formData.append(
      'invoiceClosingDate',
      this.invoice.invoiceClosingDate.toString()
    );
    formData.append('offering', this.invoice.offering);
    formData.append('subtotal', this.invoice.subtotal.toString());
    formData.append('grandTotal', this.invoice.grandTotal.toString());
    formData.append('additionalCost', this.invoice.additionalCost.toString());
    formData.append('totalCost', this.invoice.totalCost.toString());
    formData.append('status', this.invoice.status);
    formData.append('isDone', this.invoice.isDone.toString());

    for (let i = 0; i < this.invoice.itemList.length; i++) {
      const item = this.invoice.itemList[i];
      const newItem: any = {
        itemId: item.itemId,
        userId: item.userId,
        UOMId: item.UOMId,
        firstPrice: item.firstPrice,
        lastPrice: item.lastPrice,
        quantity: item.quantity,
        VAT: item.VAT,
        unitPrice: item.unitPrice,
        additionalCost: item.additionalCost,
        purchaseAdditionalCost: item.purchaseAdditionalCost,
        deliveryAdditionalCost: item.deliveryAdditionalCost,
        totalPrice: item.totalPrice,
        POD: item.POD,
        closingDate: item.closingDate.toString(),
        purchasePrice: item.purchasePrice,
        isFirstPaymentDone: item.isFirstPaymentDone,
        firstPaymentPrice: item.firstPaymentPrice,
        firstPaymentDate: item.firstPaymentDate.toString(),
        isLastPaymentDone: item.isLastPaymentDone,
        lastPaymentPrice: item.lastPaymentPrice,
        lastPaymentDate: item.lastPaymentDate.toString(),
        logisticCompany: item.logisticCompany,
        logisticLocation: item.logisticLocation,
        logisticEstimatedDate: item.logisticEstimatedDate.toString(),
        shippingStatus: item.shippingStatus,
        isDeliveredToIraq: item.isDeliveredToIraq,
        isDeliveredByLogistic: item.isDeliveredByLogistic,
        isDeliverToClient: item.isDeliverToClient,
        logisticCost: item.logisticCost,
        isFullyPaid: item.isFullyPaid,
        isSubmitted: item.isSubmitted,
        status: item.status,
      };

      // Append the properties of the newItem object to the formData
      for (const property in newItem) {
        if (newItem.hasOwnProperty(property)) {
          formData.append(`itemList.${property}[]`, newItem[property]);
        }
      }
      for (let j = 0; j < item.uploadedFiles1.length; j++) {
        formData.append(
          `itemList.uploadedFiles.1.${i}[]`,
          item.uploadedFiles1[j]
        );
      }
      for (let j = 0; j < item.uploadedFiles2.length; j++) {
        formData.append(
          `itemList.uploadedFiles.2.${i}[]`,
          item.uploadedFiles2[j]
        );
      }
      for (let j = 0; j < item.uploadedFiles3.length; j++) {
        formData.append(
          `itemList.uploadedFiles.3.${i}[]`,
          item.uploadedFiles3[j]
        );
      }
      // Append uploaded files (if any)
      // for (let j = 0; j < item.uploadedFiles1.length; j++) {

      //     formData.append(
      //       `itemList.uploadedFiles.${i}[]`,
      //       item.uploadedFiles1[j]
      //     );

      // }
      // for (let j = 0; j < item.uploadedFiles2.length; j++) {
      //   formData.append(`itemList[${i}].uploadedFiles2[]`, item.uploadedFiles2[j]);
      // }
      // for (let j = 0; j < item.uploadedFiles3.length; j++) {
      //   formData.append(`itemList[${i}].uploadedFiles3[]`, item.uploadedFiles3[j]);
      // }
    }

    // Now you can use the formData object in your HTTP request

    this.http
      .post<any>('https://tmb.kreatedev.com/api/api/invoice', formData)
      .subscribe((data) => {
        // console.log(this.invoice);
        // console.log('FormData', formData.getAll('itemList'));
        this.invoice.invoiceID = data.id;
        console.log('response', data);
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
