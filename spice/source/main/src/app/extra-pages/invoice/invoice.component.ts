import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/service/auth.service';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { startWith, map } from 'rxjs';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/core/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {

  material = [MatAutocompleteModule];

  isFormSubmitted = false;
  isModalOpen: boolean = false;

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
  
    const filterValue = value.toLowerCase();
    return this.itemNameId.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private _filter2(value: string): any[] {
 
    const filtervalue = value.toLowerCase();
    return this.userNameId.filter((option) =>
      option.name.toLowerCase().includes(filtervalue)
    );
  }

  private _filter3(value: string): any[] {
   
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
        this.uomNameId = this.uomList.data.map(
          (uom: { id: any; name: any }) => {
            return {
              id: uom.id,
              name: uom.name,
            };
          }
        );
      });
  }
  userName: string[] = [];

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
      });
  }

  getProductList() {
    this.http
      .get<any[]>(`${backendEnvironment.apiUrl}/api/items`)
      .subscribe((data) => {
        this.productlist = data;
        this.itemNameId = this.productlist.data.map(
          (product: { id: string; name: string }) => {
            return {
              id: product.id,
              name: product.name,
            };
          }
        );
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
      origin: ' ',
      partNumber: ' ',
      manufacturer: ' ',
      
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

  submit() {
    this.isFormSubmitted = true;

    this.invoice.invoiceDate = new Date();
    this.invoice.invoiceEstimatedDate = moment(this.invoice.invoiceEstimatedDate).format('YYYY-MM-DD');
    this.invoice.invoiceClosingDate = moment(this.invoice.invoiceClosingDate).format('YYYY-MM-DD');

    // this.invoice.totalCost = 0;
    // this.invoice.subtotal = 0;
    // this.invoice.grandTotal = 0;

    for (const item of this.itemList) {
      // item.totalPrice =
      //   item.unitPrice * item.quantity +
      //   item.VAT +
      //   item.additionalCost +
      //   item.deliveryAdditionalCost;

      // this.invoice.subtotal += item.firstPrice * item.quantity;
      // this.invoice.totalCost += item.totalPrice;
      // this.invoice.grandTotal += item.totalPrice + item.logisticCost;

      item.closingDate = moment(item.closingDate).format('YYYY-MM-DD');
      // item.firstPaymentDate = moment(item.firstPaymentDate).format('YYYY-MM-DD');
      // item.lastPaymentDate = moment(item.lastPaymentDate).format('YYYY-MM-DD');
      // item.logisticEstimatedDate = moment(item.logisticEstimatedDate).format('YYYY-MM-DD');

    }

    for (let i = 0; i < this.itemList.length; i++) {
      this.itemList[i].itemId = this.tempItem[i];
      this.itemList[i].userId = this.tempUser[i];
      this.itemList[i].UOMId = this.tempUom[i];
    }
    this.invoice.itemList = this.itemList;
    // console.log(this.invoice);

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
   
    formData.append('additionalCost', this.invoice.additionalCost.toString());
    formData.append('status', this.invoice.status);

    for (let i = 0; i < this.invoice.itemList.length; i++) {
      const item = this.invoice.itemList[i];
      const newItem: any = {
        itemId: item.itemId,
        userId: item.userId,
        UOMId: item.UOMId,
        quantity: item.quantity,
        origin:item.origin,
        partNumber: item.partNumber,
        manufacturer:item.manufacturer,
        status: item.status,
      };

      for (const property in newItem) {
        if (newItem.hasOwnProperty(property)) {
          formData.append(`itemList.${property}[]`, newItem[property]);
        }
      }
    }
    // console.log(formData);

    this.http
      .post<any>(`${backendEnvironment.apiUrl}/api/createInvoice`, formData)
      .subscribe((data) => {
        // console.log(this.invoice);
        this.invoice.invoiceID = data.id;
        // console.log(data);
      });

      this.router.navigate(['extra-pages','invoicelist']);
  }

  breadscrums = [
    {
      title: 'Invoice',
      items: ['Extra'],
      active: 'Invoice',
    },
  ];
}
