export class Item {
  itemId: string = ' ';
  userId: string = '';
  UOMId: string = '';
  quantity: number = 0;
  origin: string = '';
  partNumber: string = '';
  manufacturer: string = '';

  /////////////////////////////

  firstPrice: number = 0;
  lastPrice: number = 0;
  VAT: number = 0;
  purchasePrice: number = 0;
  uploadedFiles1: File[] = [];

  /////////////////////////////

  unitPrice: number = 0;
  additionalCost: number = 0;
  purchaseAdditionalCost: number = 0;
  deliveryAdditionalCost: number = 0;
  totalPrice: number = 0;
  POD: string = '';
  closingDate: any = new Date(1970, 0, 1);
  uploadedFiles2: File[] = [];

  //////////////////////////////////
 
  isFirstPaymentDone: boolean = false;
  firstPaymentPrice: number = 0;
  firstPaymentDate: any = new Date(1970, 0, 1);
  isLastPaymentDone: boolean = false;
  lastPaymentPrice: number = 0;
  lastPaymentDate: any = new Date(1970, 0, 1);
  logisticCompany: string = '';
  logisticLocation: string = '';
  logisticEstimatedDate: any = new Date(1970, 0, 1);
  shippingStatus: string = '';

  isDeliveredToIraq: boolean = false; // Set to false by default
  isDeliveredByLogistic: boolean = false; // Set to false by default
  isDeliverToClient: boolean = false; // Set to false by default
  logisticCost: number = 0;
  isFullyPaid: boolean = false;
  isSubmitted: boolean = false;
  uploadedFiles3: File[] = [];

  status: string = 'pricing_level';
 
}
