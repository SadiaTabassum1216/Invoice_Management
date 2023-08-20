import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { AuthService } from 'src/app/core/service/auth.service';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


declare var require: any;

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/core/models/user';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
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

  material = [MatAutocompleteModule];

  isFormSubmitted = false;
  isModalOpen: boolean = false;

  dialog?: MatDialogRef<ModalComponent>;
  selectedFiles: FileList | null | undefined;

  public currentUser: Observable<AuthUser> | undefined;
  name: string = '';
  id: number = 0;
  roles:  string[] = [];
  itemList: Item[] = [];
  invoice: Invoice = new Invoice();
  itemName: string[] = [];
  productlist: any;
  userList: any;
  uomList: any;
  tempItem: string[] = [];
  tempUser: string[] = [];
  tempUom: string[] = [];
  // userName: string[] = [];

  filteredOptionsItem: Observable<any[]> | undefined;
  filteredOptionsUser: Observable<any[]> | undefined;
  filteredOptionsUOM: Observable<any[]> | undefined;

  myControlitem = new FormControl();
  myControluser = new FormControl();
  myControlUom = new FormControl();
  

  constructor(
    private http: HttpClient,
    private dialogModel: MatDialog,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.currentUser.subscribe((info) => {
      this.name = info['user']['name'];
      this.id = info['user']['id'];
      this.roles=info['user']['roles'];
    });

    // if (this.id !== 1) {
    //   this.router.navigate(['/**']);
    // }

    if (!this.roles.includes('admin')) {
      this.router.navigate(['/**']); 
    }

    this.getProductList();
    this.getUserList();
    this.getUOMList();

    this.filteredOptionsItem = this.myControlitem.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.filteredOptionsUser = this.myControluser.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter2(value))
    );
    this.filteredOptionsUOM = this.myControlUom.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter3(value))
    );
  }


  private _filter(value: string): any[] {
    // if (typeof value !== 'string') {
    //   return [];
    // }

    const filterValue = value.toLowerCase();
    return this.itemNameId.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private _filter2(value: string): any[] {
    // if (typeof value !== 'string') {
    //   return [];
    // }
    const filtervalue = value.toLowerCase();
    return this.userNameId.filter((option) =>
      option.name.toLowerCase().includes(filtervalue)
    );
  }

  private _filter3(value: string): any[] {
    // if (typeof value !== 'string') {
    //   return [];
    // }
    const filtervalue = value.toLowerCase();
    return this.uomNameId.filter((option) =>
      option.name.toLowerCase().includes(filtervalue)
    );
  }



  itemNameId: { id: string; name: string }[] = [];
  userNameId: { id: any; name: any }[] = [];
  uomNameId: { id: any; name: any }[] = [];

  getUOMList() {
    this.http
      .get<any[]>(`${backendEnvironment.apiUrl}/api/searchUOM`)
      .subscribe((data) => {
        this.uomList = data;
        //  console.log("uom: ", this.uomList);
        this.uomNameId = this.uomList.data.map(
          (uom: { id: any; name: any }) => {
            return {
              id: uom.id,
              name: uom.name,
            };
          }
        );
        //  console.log("items: ", this.uomNameId);
      });
  }
  userName: string[] = [];

  getUserList() {
    this.http
      .get<any[]>(`${backendEnvironment.apiUrl}/api/users`)
      .subscribe((data) => {
        this.userList = data;
        console.log("users: ", this.userList);
        this.userNameId = this.userList.data.map(
          (user: { id: any; name: any }) => {
            return {
              id: user.id,
              name: user.name,
            };
          }
        );
        // console.log("User Name: ", this.userNameId);
        // this.userName = this.userList.data.map((user: any) => user.name);
        // this.itemName = this.items.map(item => item.itemId);
        // console.log("User Names: ", this.userName);

      });
  }

  getProductList() {
    this.http
      .get<any[]>(`${backendEnvironment.apiUrl}/api/items`)
      .subscribe((data) => {
        this.productlist = data;
        // console.log("products: ", this.productlist);
        this.itemNameId = this.productlist.data.map(
          (product: { id: string; name: string }) => {
            return {
              id: product.id,
              name: product.name,
            };
          }
        );
        // console.log("items: ", this.itemNameId);
      });
  }

  addRow() {
    const newItem: Item = {
      itemId: ' ',
      userId: '',
      UOMId: '',
      firstPrice: 0,
      lastPrice: 0,
      quantity: 0,
      origin: '',
      partNumber: '',
      manufacturer: '',
      
      VAT: 0,
      unitPrice: 0,
      additionalCost: 0,
      purchaseAdditionalCost: 0,
      deliveryAdditionalCost: 0,
      totalPrice: 0,
      POD: ' ',
      closingDate: new Date(1970, 0, 1),
      purchasePrice: 0,
      isFirstPaymentDone: false,
      firstPaymentPrice: 0,
      firstPaymentDate: new Date(1970, 0, 1),
      isLastPaymentDone: false,
      lastPaymentPrice: 0,
      lastPaymentDate: new Date(1970, 0, 1),
      logisticCompany: ' ',
      logisticLocation: ' ',
      logisticEstimatedDate: new Date(1970, 0, 1),
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
    for (let i = 0; i < this.itemList.length; i++) {
      this.itemList[i].itemId = this.tempItem[i];
      this.itemList[i].userId = this.tempUser[i];
      this.itemList[i].UOMId = this.tempUom[i];
    }

    this.itemList.push(newItem);

  }

  files: File[] = [];


  onFileSelect(event: any, index: number): void {
    // const files = Array.from(event.target.files) as File[];
    // this.itemList[index].uploadedFiles1 = files;
    this.selectedFiles = event.target.files;
  }

  uploadFiles(targetArray: File[], index: number): void {
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

    const pageSize = {
      width: 2200.0, // Page width in points (A4 size: 595.28 points)
      height: 600.0, // Page height in points (A4 size: 841.89 points)
    };

    const documentDefinition = {
      pageSize: pageSize,
      content: pdfContent,
    };

    pdfMake.createPdf(documentDefinition).download('newinvoice.pdf');
  }

  submit() {
    this.isFormSubmitted = true;

    this.invoice.invoiceDate = new Date();

    this.invoice.invoiceEstimatedDate = moment(this.invoice.invoiceEstimatedDate).format('YYYY-MM-DD');
    this.invoice.invoiceClosingDate = moment(this.invoice.invoiceClosingDate).format('YYYY-MM-DD');
    //  this.invoice.invoiceEstimatedDate = formatDate(this.invoice.invoiceEstimatedDate);

    this.invoice.totalCost = 0;
    this.invoice.subtotal = 0;
    this.invoice.grandTotal = 0;

    for (const item of this.itemList) {
      item.totalPrice =
        item.unitPrice * item.quantity +
        item.VAT +
        item.additionalCost +
        item.deliveryAdditionalCost;

      this.invoice.subtotal += item.firstPrice * item.quantity;
      this.invoice.totalCost += item.totalPrice;
      this.invoice.grandTotal += item.totalPrice + item.logisticCost;

      item.closingDate = moment(item.closingDate).format('YYYY-MM-DD');
      item.firstPaymentDate = moment(item.firstPaymentDate).format('YYYY-MM-DD');
      item.lastPaymentDate = moment(item.lastPaymentDate).format('YYYY-MM-DD');
      item.logisticEstimatedDate = moment(item.logisticEstimatedDate).format('YYYY-MM-DD');

    }

    for (let i = 0; i < this.itemList.length; i++) {
      this.itemList[i].itemId = this.tempItem[i];
      this.itemList[i].userId = this.tempUser[i];
      this.itemList[i].UOMId = this.tempUom[i];
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
        origin:item.origin,
        partNumber: item.partNumber,
        manufacturer:item.manufacturer,

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

      // Append uploaded files (if any)
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
      
    }

    this.http
      .post<any>(`${backendEnvironment.apiUrl}/api/invoice`, formData)
      .subscribe((data) => {
        console.log(this.invoice);
        this.invoice.invoiceID = data.id;
        console.log(data);
      });

      // this.router.navigate['/invoicelist'];
  }

  breadscrums = [
    {
      title: 'Invoice',
      items: ['Extra'],
      active: 'Invoice',
    },
  ];
}
