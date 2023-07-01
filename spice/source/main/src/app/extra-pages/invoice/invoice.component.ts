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

declare var require: any;

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/core/models/user';
import { Product } from 'src/app/models/product.model';
import { Router } from '@angular/router';
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
  uploadedFilePaths1: string[] = [];
  uploadedFilePaths2: string[] = [];
  uploadedFilePaths3: string[] = [];

  dialog?: MatDialogRef<ModalComponent>;
  selectedFiles1: FileList | null | undefined;
  selectedFiles2: FileList | null | undefined;
  selectedFiles: FileList | null | undefined;

  public currentUser: Observable<AuthUser> | undefined;
  name: string = '';
  id: number = 0;
  // items: Item[] = [];
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
    ) { }

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

  private _filter(value : string) :any[]{
    const filtervalue=value.toLowerCase()
    return this.itemNameId.filter(option =>option.name.toLowerCase().includes(filtervalue));
  }

  private _filter2(value : string) :any[]{
    const filtervalue=value.toLowerCase()
    return this.userNameId.filter(option =>option.name.toLowerCase().includes(filtervalue));
  }


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


  export(): void {
    const toPrintContent = this.toPrint.nativeElement.innerHTML;
    const pdfContent = htmlToPdfmake(toPrintContent, { tableAutoSize: true });
    const documentDefinition = { content: pdfContent };
    pdfMake.createPdf(documentDefinition).download('newinvoice.pdf');
  }


  submit() {
    this.isFormSubmitted = true;

    this.invoice.invoiceDate = new Date();

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
      console.log(this.invoice);
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
