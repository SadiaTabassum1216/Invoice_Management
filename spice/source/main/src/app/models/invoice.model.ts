import { Item } from "./item.model";

export class Invoice {
    invoiceID!: string;
    invoiceDate!: Date;
    invoiceTime!: string;
    itemList: Item[]=[];
    totalCost!: number;
    status!: string;
   
  }
  
