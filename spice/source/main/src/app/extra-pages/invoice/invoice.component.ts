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

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/core/models/user';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
const htmlToPdfmake = require("html-to-pdfmake");
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  @ViewChild('toPrint')
  toPrint!: ElementRef;


  material=[
    MatAutocompleteModule
  ];

  isFormSubmitted = false;
  isModalOpen: boolean = false;

  dialog?: MatDialogRef<ModalComponent>;
  
  

  public currentUser: Observable<AuthUser> | undefined;
  name: string = '';
  id: number = 0;
  itemList: Item[] = [];
  invoice: Invoice = new Invoice;
  itemName: string[] = [];
  productlist: any;
  userList: any;
  userName: string[] = [];


  filteredOptionsItem: Observable<any[]> | undefined;
  filteredOptionsUser: Observable<any[]> | undefined;

  myControlitem= new FormControl();
  myControluser= new FormControl();

  constructor(private http: HttpClient, 
    private dialogModel: MatDialog,
    private router: Router, 
    private authService: AuthService,
    // private datePipe: DatePipe
    ) {
   
     }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.currentUser.subscribe(info => {
      this.name = info['user']['name'];
      this.id = info['user']['id'];
    });

    if (this.id !== 1) {
      this.router.navigate(['/**']);
    }

    this.getProductList();
    this.getUserList();


    this.filteredOptionsItem= this.myControlitem.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    )
    this.filteredOptionsUser= this.myControluser.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value))
    )
  }

  // private _filter(value : string) :any[]{
  //   const filtervalue=value.toLowerCase()
  //   return this.itemNameId.filter(option =>option.name.toLowerCase().includes(filtervalue));
  // }

  private _filter(value: string): any[] {
    if (typeof value !== 'string') {
      return [];
    }
  
    const filterValue = value.toLowerCase();
    return this.itemNameId.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  

  private _filter2(value : string) :any[]{
    if (typeof value !== 'string') {
      return [];
    }
    const filtervalue=value.toLowerCase()
    return this.userNameId.filter(option =>option.name.toLowerCase().includes(filtervalue));
  }


 
  // formatDate(date: Date): string {
  //   return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  // }
  
  itemNameId: { id: any, name: any }[] = [];
  userNameId: { id: any, name: any }[] = [];

  getUserList() {
    this.http.get<any[]>(`${backendEnvironment.apiUrl}/api/users`).subscribe(data => {
      this.userList = data;
      // console.log("users: ", this.userList);
      this.userNameId = this.userList.data.map((user: { id: any, name: any }) => {
        return {
          id: user.id,
          name: user.name
        };
      });
      // console.log("User Name: ", this.userNameId);

    });

  }

  getProductList() {
    this.http.get<any[]>(`${backendEnvironment.apiUrl}/api/items`).subscribe(data => {
      this.productlist = data;
      // console.log("products: ", this.productlist);
      this.itemNameId = this.productlist.data.map((product: { id: any, name: any }) => {
        return {
          id: product.id,
          name: product.name
        };
      });
      // console.log("items: ", this.itemNameId);
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
      closingDate:new Date(1970, 0, 1),
      purchasePrice: 0,
      isFirstPaymentDone: false,
      firstPaymentPrice: 0,
      firstPaymentDate:new Date(1970, 0, 1),
      isLastPaymentDone: false,
      lastPaymentPrice: 0,
      lastPaymentDate: new Date(1970, 0, 1),
      logisticCompany: ' ',
      logisticLocation: ' ',
      logisticEstimatedDate:new Date(1970, 0, 1),
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


  files: File[]=[];

  // onFileSelect(event: any): void {
  //   this.files = Array.from(event.target.files);
  // }
  // onFileSelect(event: any, index: number): void {
  //   const files = Array.from(event.target.files);
  //   this.itemList[index].uploadedFiles1=files;
  // }
  onFileSelect(event: any, index: number): void {
    const files = Array.from(event.target.files) as File[];
    this.itemList[index].uploadedFiles1 = files;
  }
  

  uploadFiles(targetArray: File[], index: number): void {
    if (this.files.length === 0) {
      console.log('No files to upload.');
      return;
    }
    
    // const files = this.itemList[index].targetArray;
    const formData: FormData = new FormData();

    for (let i = 0; i < this.files.length; i++) {
      const file = this.files[i];
      targetArray.push(file);
      // formData.append('files', file);
      
      formData.append('files', file, file.name);
    }

    console.log("target array: ",targetArray);
    console.log('Files in FormData:', formData.getAll('files'));
    console.log('Files uploaded successfully');

    this.files=[];
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
 // formatDateToString(date: Date): string {
  //   return formatDate(date, 'yyyy-MM-dd', 'en-US');
  // }
  formatDate(date: Date): string {
    if (date) {
      return this.formatDateToString(date);
    } else {
      const currentDate = new Date();
      return this.formatDateToString(currentDate);
    }
  }

  formatDateToString(date: Date): string {
    const year = date.getFullYear();
    const month = this.padNumber(date.getMonth() + 1);
    const day = this.padNumber(date.getDate());
    return `${year}-${month}-${day}`;
  }
  
  padNumber(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }

  export(): void {
    const toPrintContent = this.toPrint.nativeElement.innerHTML;
    const pdfContent = htmlToPdfmake(toPrintContent, { tableAutoSize: true });
  
    const pageSize = {
      width: 2200.00, // Page width in points (A4 size: 595.28 points)
      height: 600.00, // Page height in points (A4 size: 841.89 points)
    };
  
    const documentDefinition = {
      pageSize: pageSize,
      content: pdfContent
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
      item.totalPrice = item.unitPrice * item.quantity + item.VAT + item.additionalCost + item.deliveryAdditionalCost;

      this.invoice.subtotal += item.firstPrice;
      this.invoice.totalCost += item.totalPrice;
      this.invoice.grandTotal += this.invoice.totalCost + item.logisticCost;
    }

    this.invoice.itemList = this.itemList;
     console.log(this.invoice);


    this.http.post<any>(`${backendEnvironment.apiUrl}/api/invoice`, this.invoice).subscribe(data => {
      // console.log(this.invoice);
      this.invoice.invoiceID = data.id;
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
