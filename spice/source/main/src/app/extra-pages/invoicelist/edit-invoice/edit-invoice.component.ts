import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, map, startWith } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';
import { Invoice2, InvoiceItem, Item2 } from 'src/app/models/invoice2.model';
import { Item } from 'src/app/models/item.model';
import { backendEnvironment } from 'src/environments/backendEnvironment';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss']
})
export class EditInvoiceComponent implements OnInit{
  invoice: Invoice2 = new Invoice2();
  dialogConfig?: MatDialogConfig;
  material = [MatAutocompleteModule];
  
  filteredOptionsItem: Observable<any[]> | undefined;
  filteredOptionsUser: Observable<any[]> | undefined;
  filteredOptionsUOM: Observable<any[]> | undefined;

  myControlitem = new FormControl();
  myControluser = new FormControl();
  myControlUom = new FormControl();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private http: HttpClient) {
    // console.log(data.invoice); 
    this.invoice = data.invoice;
    // console.log(this.invoice);
  }
  ngOnInit(): void {
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

  productlist: any;
  userList: any;
  uomList: any;

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
    const newItem: InvoiceItem = {
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

  update(item: InvoiceItem) {
    this.http.put<any>(`${backendEnvironment.apiUrl}/api/invoice_item/${item.id}`, item).subscribe(data => {
       console.log(data);
      //  console.log(a);
    });
    // this.dialog.closeAll();
  }

  updateInvoice(){
    this.http.put<any>(`${backendEnvironment.apiUrl}/api/invoice/${this.invoice.id}`, this.invoice).subscribe(data => {
       console.log(data);
    });
    this.dialog.closeAll();

  }

  close() {
    this.dialog.closeAll();
  }

}
