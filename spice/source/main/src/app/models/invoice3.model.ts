export class Invoice3 {
    id: number = 0;
    invoiceDate: Date = new Date();
    invoiceTime: string = '';
    invoiceEstimatedDate: any= new Date(1970, 0, 1);
    invoiceClosingDate: any= new Date(1970, 0, 1);
    invoiceTotalCost: number = 0;
    invoiceSubtotal: number = 0;
    invoiceGrandtotal: number = 0;
    invoiceAdditionalCost: number = 0;
    invoiceStatus: string = '';
    invoiceOffering: string = '';
    invoiceIsDone: boolean=false;
    invoice_items: InvoiceItem3[] = []
}


export class InvoiceItem3{
    id: number = 0;
    itemName: string ='';
    invoiceID: number = 0;
    userID: number = 0;
    invoiceItemQTY: number = 0;
    uomID: number = 0;
    invoiceItemFirstPrice: number = 0;
    invoiceItemLastPrice: number = 0;
    invoiceItemVAT: number = 0;
    invoiceItemUnitPrice: number = 0;
    invoiceItemQouteAdditionalCost: number = 0;
    invoiceitemPurchaseAdditionalCost: number = 0;
    invoiceItemDeliveryAdditionalCost: number = 0;
    invoiceItemTotalPrice: number = 0;
    invoiceItemPOD: string = '';
    invoiceItemClosingDate: string = '';
    
    invoiceItemPurchasePrice: number = 0;
    invoiceItemFirstPaymentPrice: number = 0;
    invoiceItemFirstPaymentDate: string = '';
    invoiceItemLastPaymentPrice: number = 0;
    invoiceItemLastPaymentDate: string = '';

    invoiceItemLogisticCompany: string = '';
    invoiceItemLogisticLocation: string = '';
    invoiceItemLogisitEstimatedDate: string = '';

    invoiceItemShippingStatus: string = '';
    invoiceItemDeliveredToIraq: boolean = false;
    invoiceItemDeliverByLogisic: boolean = false;
    invoiceItemDeliverToClient: boolean = false;
    invoiceItemLogisticCost: number = 0;
    invoiceItemFullPaid: boolean = false;
    invoiceItemSubmitted: boolean = false;
    
    invoiceItemStatus: string = '';
    invoiceItemIsFirstPaymentDone: boolean = false;
    invoiceItemIsLastPaymentDone: boolean = false;
}