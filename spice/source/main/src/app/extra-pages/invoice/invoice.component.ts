import { Component } from '@angular/core';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent {
  items: any[];
  invoices: any[];
  invoice:any; 
  isFormSubmitted = false; 


  submit(){
    //send the data to backend
    console.log(this.invoice);
  }

  submitInvoiceForm() {
   
    this.isFormSubmitted = true;
  }

  breadscrums = [
    {
      title: 'Invoice',
      items: ['Extra'],
      active: 'Invoice',
    },
  ];
  constructor() {
    this.invoice= {
      invoiceID: 'INV001',
      invoiceDate: new Date(),
      billFrom:'',
      billToName:'',
      billToAddress:'',
      invoiceTime: '10:00 AM',
      invoiceEstimateDate: '2023-06-25',
      closingDate: '2023-06-30',
      totalCost: 500,
      totalSubtotal: 450,
      grandTotal: 550,
      additional: 'Additional information goes here',
      status: 'Pending',
      offering: 'Special Discount',
      done: false
    };
    

    this.items = [
      {
        itemId: 1,
        itemName: 'Item 1',
        itemDesc: 'Description of Item 1',
        itemSource: 'Source of Item 1',
        itemStatus: 'Active'
      },
      {
        itemId: 2,
        itemName: 'Item 2',
        itemDesc: 'Description of Item 2',
        itemSource: 'Source of Item 2',
        itemStatus: 'Inactive'
      },
      {
        itemId: 3,
        itemName: 'Item 3',
        itemDesc: 'Description of Item 3',
        itemSource: 'Source of Item 3',
        itemStatus: 'Active'
      }
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
      // Add more invoices as needed
    ];
  }
}
