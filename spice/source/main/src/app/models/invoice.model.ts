import { Item } from "./item.model";

export class Invoice {
    invoiceID: string='';
    invoiceDate: Date= new Date();
    itemList: Item[]=[];
    totalCost: number=0;
    status: string='';
   
  }
  
