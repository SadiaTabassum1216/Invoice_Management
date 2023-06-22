import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent  implements OnInit{

  items: any[]=[];
  itemsWithQuantity: Item[] = [];
  invoice: Invoice = new Invoice;
  invaddress:any;
  isFormSubmitted = false;
 
  discountPercentage = 0.05; 
  taxPercentage = 0.1;


  
  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
  //  this.getItemList();

   this.items= [
    new Item(1, 'Item 1', 'Description of Item 1', 'Source of Item 1', 'Active', 0, 12),
    new Item(2, 'Item 2', 'Description of Item 2', 'Source of Item 2', 'Inactive', 0, 45),
    new Item(3, 'Item 3', 'Description of Item 3', 'Source of Item 3', 'Active', 0, 34)
  ];
  }


  getItemList() {
    this.http.get<any[]>('http://localhost:8000/api/items').subscribe(data => {
       this.items = data;
      console.log(this.items);
    });

   

  }

  submit() {
    //send the data to backend

    this.isFormSubmitted = true;
    this.itemsWithQuantity = this.items.filter(item => item.quantity > 0);
    // this.subtotal = 0;
    this.invoice.subtotal=0;
    for (const item of this.itemsWithQuantity) {
      console.log(item.totalPrice)
      this.invoice.subtotal += item.totalPrice;
    }
  
    this.invoice.discount = this.invoice.subtotal * this.discountPercentage;
    this.invoice.tax = this.invoice.subtotal * this.taxPercentage;
    this.invoice.totalCost = this.invoice.subtotal - this.invoice.discount + this.invoice.tax;

    this.http.post<any>('http://localhost:8000/api/user', this.invoice).subscribe(data => {
      console.log(this.invoice)
    });

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
  

}
