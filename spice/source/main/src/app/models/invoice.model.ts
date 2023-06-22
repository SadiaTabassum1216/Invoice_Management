import { Item } from "./item.model";

export class Invoice {
    invoiceID!: string;
    invoiceDate!: Date;
    invoiceTime!: string;
    estimateDate!: Date;
    closingDate!: Date;
    itemList: Item[]=[];
    subtotal!: number;
    tax!: number;
    discount!: number;
    totalCost!: number;
    status!: string;
   
  }
  
