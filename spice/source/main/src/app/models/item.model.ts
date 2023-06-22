export class Item {
  itemId: number;
  itemName: string;
  itemDesc: string;
  itemSource: string;
  itemStatus: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number=0;

  constructor(
    itemId: number,
    itemName: string,
    itemDesc: string,
    itemSource: string,
    itemStatus: string,
    quantity: number,
    unitPrice: number
  ) {
    this.itemId = itemId;
    this.itemName = itemName;
    this.itemDesc = itemDesc;
    this.itemSource = itemSource;
    this.itemStatus = itemStatus;
    this.quantity = quantity;
    this.unitPrice = unitPrice; 
   
  }
}
