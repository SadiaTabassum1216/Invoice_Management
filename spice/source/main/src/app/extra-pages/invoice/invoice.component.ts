import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  items: Item[];
  itemsWithQuantity: Item[] = [];
  invoices: any[];
  invoice: any;
  isFormSubmitted = false;
  subtotal: number = 0;
  discountPercentage = 0.05;
  discount: number = 0;
  total: number = 0;
  taxPercentage = 0.1;
  tax: number = 0;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
    this.getItemList();
  }


  getItemList() {
    //get list here
  }


  submit() {
    //send the data to backend

    this.isFormSubmitted = true;
    this.itemsWithQuantity = this.items.filter(item => item.quantity > 0);

    this.subtotal = 0;
    for (const item of this.itemsWithQuantity) {
      console.log(item.totalPrice)
      this.subtotal += item.totalPrice;
    }
    console.log(this.subtotal);


    this.discount = this.subtotal * this.discountPercentage;

    this.tax = this.subtotal * this.taxPercentage;

    this.total = this.subtotal - this.discount + this.tax;

  }



  increaseQuantity(item: any) {
    item.quantity++;
    item.totalPrice = item.quantity * item.unitPrice;
  }


  breadscrums = [
    {
      title: 'Invoice',
      items: ['Extra'],
      active: 'Invoice',
    },
  ];
  constructor() {
    this.invoice = {
      invoiceID: 'INV001',
      invoiceDate: new Date(),
      billFrom: '',
      billToName: '',
      billToAddress: '',
      closingDate: '2023-06-30',

      additional: 'Additional information goes here',
      status: 'Pending',
      offering: 'Special Discount',
      done: false
    };


    this.items= [
      new Item(1, 'Item 1', 'Description of Item 1', 'Source of Item 1', 'Active', 0,12),
      new Item(2, 'Item 2', 'Description of Item 2', 'Source of Item 2', 'Inactive', 0,45),
      new Item(3, 'Item 3', 'Description of Item 3', 'Source of Item 3', 'Active', 0,34)
    ];



    this.invoices = [
      {
        invoiceID: 'INV001',
        invoiceDate: '2023-06-01',
        invoiceTime: '10:00 AM',
        invoiceEstimateDate: '2023-06-05',
        closingDate: '2023-06-10',
        totalCost: 5000,
        totalSubtotal: 4500,
        grandTotal: 5500,
        additional: 'Additional info',
        status: 'Pending',
        offering: 'Product A',
        done: true
      },
      {
        invoiceID: 'INV002',
        invoiceDate: '2023-06-02',
        invoiceTime: '11:30 AM',
        invoiceEstimateDate: '2023-06-07',
        closingDate: '2023-06-12',
        totalCost: 8000,
        totalSubtotal: 7500,
        grandTotal: 8500,
        additional: 'Additional notes',
        status: 'Paid',
        offering: 'Product B',
        done: false
      },

    ];
  }

}
