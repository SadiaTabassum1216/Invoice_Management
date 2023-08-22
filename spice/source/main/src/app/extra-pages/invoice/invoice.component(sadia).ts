import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { Invoice2, InvoiceItem } from 'src/app/models/invoice2.model';
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
  selectedFiles: FileList | null | undefined;

  public currentUser: Observable<AuthUser> | undefined;
  name: string = '';
  id: number = 0;
  itemList: InvoiceItem[] = [];
  invoice: Invoice2 = new Invoice2();
  itemName: string[] = [];
  productlist: any;
  userList: any;
  uomList: any;
  userName: string[] = [];

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
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.currentUser.subscribe((info) => {
      this.name = info['user']['name'];
      this.id = info['user']['id'];
    });

    if (this.id !== 1) {
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
    if (typeof value !== 'string') {
      return [];
    }

    const filterValue = value.toLowerCase();
    return this.itemNameId.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private _filter2(value: string): any[] {
    if (typeof value !== 'string') {
      return [];
    }
    const filtervalue = value.toLowerCase();
    return this.userNameId.filter((option) =>
      option.name.toLowerCase().includes(filtervalue)
    );
  }

  private _filter3(value: string): any[] {
    if (typeof value !== 'string') {
      return [];
    }
    const filtervalue = value.toLowerCase();
    return this.uomNameId.filter((option) =>
      option.name.toLowerCase().includes(filtervalue)
    );
  }



  itemNameId: { id: any; name: any }[] = [];
  userNameId: { id: any; name: any }[] = [];
  uomNameId: { id: any; name: any }[] = [];

  getUOMList(){
    this.http
    .get<any[]>(`${backendEnvironment.apiUrl}/api/searchUOM`)
    .subscribe((data) => {
      this.uomList = data;
       console.log("uom: ", this.uomList);
      this.uomNameId = this.uomList.data.map(
        (uom: { id: any; name: any }) => {
          return {
            id: uom.id,
            name: uom.name,
          };
        }
      );
       console.log("items: ", this.uomNameId);
    });
  }

  getUserList() {
    this.http
      .get<any[]>(`${backendEnvironment.apiUrl}/api/users`)
      .subscribe((data) => {
        this.userList = data;
        // console.log("users: ", this.userList);
        this.userNameId = this.userList.data.map(
          (user: { id: any; name: any }) => {
            return {
              id: user.id,
              name: user.name,
            };
          }
        );
        // console.log("User Name: ", this.userNameId);
      });
  }

  getProductList() {
    this.http
      .get<any[]>(`${backendEnvironment.apiUrl}/api/items`)
      .subscribe((data) => {
        this.productlist = data;
        // console.log("products: ", this.productlist);
        this.itemNameId = this.productlist.data.map(
          (product: { id: any; name: any }) => {
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
    let newItem: InvoiceItem = {
      id: 0,
      userID: 0,
      uomID: 0,
      invoiceItemFirstPrice: 0,
      invoiceItemLastPrice: 0,
      invoiceItemQTY: 0,
      invoiceItemVAT: 0,
      invoiceItemUnitPrice: 0,
      invoiceItemQouteAdditionalCost: 0,
      invoiceitemPurchaseAdditionalCost: 0,
      invoiceItemDeliveryAdditionalCost: 0,
      invoiceItemTotalPrice: 0,
      invoiceItemPOD: '',
      invoiceItemClosingDate: '',
      invoiceItemPurchasePrice: 0,
      invoiceItemFirstPaymentPrice: 0,
      invoiceItemFirstPaymentDate: '',
      invoiceItemLastPaymentPrice: 0,
      invoiceItemLastPaymentDate: '',
      invoiceItemLogisticCompany: '',
      invoiceItemLogisticLocation: '',
      invoiceItemLogisitEstimatedDate: '',
      invoiceItemShippingStatus: '',
      invoiceItemDeliveredToIraq: false,
      invoiceItemDeliverByLogisic: false,
      invoiceItemDeliverToClient: false,
      invoiceItemLogisticCost: 0,
      invoiceItemFullPaid: false,
      invoiceItemSubmitted: false,
      invoiceItemStatus: '',
      invoiceItemIsFirstPaymentDone: false,
      invoiceItemIsLastPaymentDone: false,
      
      invoiceID: 0,
      items: [],
      invoice_item_files: []
    };

    this.invoice.invoice_items.push(newItem);
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

    this.invoice.invoiceTotalCost = 0;
    this.invoice.invoiceSubtotal = 0;
    this.invoice.invoiceGrandtotal = 0;

    for (const item of this.itemList) {
      item.invoiceItemTotalPrice =
        item.invoiceItemUnitPrice * item.invoiceItemQTY +
        item.invoiceItemVAT +
        item.invoiceItemQouteAdditionalCost +
        item.invoiceItemDeliveryAdditionalCost;

      this.invoice.invoiceSubtotal += item.invoiceItemFirstPrice * item.invoiceItemQTY;
      this.invoice.invoiceTotalCost += item.invoiceItemTotalPrice;
      this.invoice.invoiceGrandtotal += item.invoiceItemTotalPrice + item.invoiceItemLogisticCost;
    }

    this.invoice.invoice_items = this.itemList;
    console.log(this.invoice);

    const formData: FormData = new FormData();
    formData.append('invoiceID', this.invoice.id.toString());
    formData.append('invoiceDate', this.invoice.invoiceDate.toISOString());
    formData.append(
      'invoiceEstimatedDate',
      this.invoice.invoiceEstimatedDate.toString()
    );
    formData.append(
      'invoiceClosingDate',
      this.invoice.invoiceClosingDate.toString()
    );
    formData.append('offering', this.invoice.invoiceOffering);
    formData.append('subtotal', this.invoice.invoiceSubtotal.toString());
    formData.append('grandTotal', this.invoice.invoiceGrandtotal.toString());
    formData.append('additionalCost', this.invoice.invoiceAdditionalCost.toString());
    formData.append('totalCost', this.invoice.invoiceTotalCost.toString());
    formData.append('status', this.invoice.invoiceStatus);
    formData.append('isDone', this.invoice.invoiceIsDone.toString());

    for (let i = 0; i < this.invoice.invoice_items.length; i++) {
      const item = this.invoice.invoice_items[i];
      const newItem: any = {
        itemId: item.id,
        userId: item.userID,
        UOMId: item.uomID,
        firstPrice: item.invoiceItemFirstPrice,
        lastPrice: item.invoiceItemLastPrice,
        quantity: item.invoiceItemQTY,
        VAT: item.invoiceItemVAT,
        unitPrice: item.invoiceItemUnitPrice,
        additionalCost: item.invoiceItemQouteAdditionalCost,
        purchaseAdditionalCost: item.invoiceitemPurchaseAdditionalCost,
        deliveryAdditionalCost: item.invoiceItemDeliveryAdditionalCost,
        totalPrice: item.invoiceItemTotalPrice,
        POD: item.invoiceItemPOD,
        closingDate: item.invoiceItemClosingDate.toString(),
        purchasePrice: item.invoiceItemPurchasePrice,
        isFirstPaymentDone: item.invoiceItemIsFirstPaymentDone,
        firstPaymentPrice: item.invoiceItemFirstPaymentPrice,
        firstPaymentDate: item.invoiceItemFirstPaymentPrice.toString(),
        isLastPaymentDone: item.invoiceItemIsLastPaymentDone,
        lastPaymentPrice: item.invoiceItemLastPaymentPrice,
        lastPaymentDate: item.invoiceItemLastPaymentDate.toString(),
        logisticCompany: item.invoiceItemLogisticCompany,
        logisticLocation: item.invoiceItemLogisticLocation,
        logisticEstimatedDate: item.invoiceItemLogisitEstimatedDate.toString(),
        shippingStatus: item.invoiceItemShippingStatus,
        isDeliveredToIraq: item.invoiceItemDeliveredToIraq,
        isDeliveredByLogistic: item.invoiceItemDeliverByLogisic,
        isDeliverToClient: item.invoiceItemDeliverToClient,
        logisticCost: item.invoiceItemLogisticCost,
        isFullyPaid: item.invoiceItemFullPaid,
        isSubmitted: item.invoiceItemSubmitted,
        status: item.invoiceItemStatus,
      };

      // Append the properties of the newItem object to the formData
      for (const property in newItem) {
        if (newItem.hasOwnProperty(property)) {
          formData.append(`itemList.${property}[]`, newItem[property]);
        }
      }

      
    }

    this.http
      .post<any>(`${backendEnvironment.apiUrl}/api/invoice`, formData)
      .subscribe((data) => {
        // console.log(this.invoice);
        this.invoice.id = data.id;
        console.log(data);
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
