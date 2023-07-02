import { Item } from "./item.model";

export class Invoice {
    invoiceID: string='';  
    invoiceDate: Date = new Date(1970, 0, 1);
    invoiceEstimatedDate: any= new Date(1970, 0, 1);
    invoiceClosingDate: any= new Date(1970, 0, 1);
    itemList: Item[]=[];
    offering: string='';
    subtotal: number=0;
    grandTotal: number=0;
    additionalCost: number=0;
    totalCost: number=0;
    status: string='';
    isDone: boolean= false;
   
  }
  