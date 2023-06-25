import { Item } from "./item.model";

export class Invoice {
    invoiceID: string='';  
    invoiceDate: Date= new Date();
    invoiceEstimatedDate: Date= new Date();
    invoiceClosingDate: Date= new Date();
    itemList: Item[]=[];
    offering: string='';
    subtotal: number=0;
    grandTotal: number=0;
    additionalCost: number=0;
    totalCost: number=0;
    status: string='';
    isDone: boolean= false;
   
  }
  
