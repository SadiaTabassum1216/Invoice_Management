export class Item {
  itemId: string='';
  firstPrice: number=0;
  lastPrice: number=0;
  quantity: number=0;
  VAT: number=0;
  unitPrice: number=0;
  additionalCost: number=0;
  purchaseAdditionalCost: number=0;
  deliveryAdditionalCost: number=0;
  totalPrice: number = 0;
  POD: string='';
  closingDate: Date=new Date();
  purchasePrice: number=0;
  isFirstPaymentDone: boolean=false;
  firstPaymentDate: Date=new Date();
  isLastPaymentDone: boolean=false;
  logisticCompany: string='';
  logisticLocation: string='';
  logisticEstimatedDate: Date=new Date();
  shippingStatus: string=''; 
  isDeliveredToIraq: boolean = false; // Set to false by default
  isDeliveredByLogistic: boolean = false; // Set to false by default
  isDeliverToClient: boolean = false; // Set to false by default
  logisticCost: number=0;
  isFullyPaid: boolean = false;
  isSubmitted: boolean = false;
  status: string='';
  static itemId: any;

  uploadedFiles1: File[] = [];
  uploadedFiles2: File[] = [];
  uploadedFiles3: File[] = [];
}
