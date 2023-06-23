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
  invaddress: any;
  isFormSubmitted = false;

  discountPercentage = 0.05;
  taxPercentage = 0.1;



  constructor(private http: HttpClient) {
    this.invaddress = {};
   
  }

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
      closingDate:new Date(),
      purchasePrice: 0,
      isFirstPaymentDone: false,
      firstPaymentDate:new Date(),
      isLastPaymentDone: false,
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
      status: ''
    };
  
    this.items.push(newItem);
  }
  

    submit() {
      this.isFormSubmitted = true;
       console.log(this.items);

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
