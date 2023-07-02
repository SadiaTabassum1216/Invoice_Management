export class Invoice2 {
    id: number = 0;
    invoiceDate: string = '';
    invoiceTime: string = '';
    invoiceEstimatedDate: string = '';
    invoiceClosingDate: string = '';
    invoiceTotalCost: number = 0;
    invoiceSubtotal: number = 0;
    invoiceGrandtotal: number = 0;
    invoiceAdditionalCost: number = 0;
    invoiceStatus: string = '';
    invoiceOffering: string = '';
    invoiceIsDone: boolean=false;
    invoice_items: InvoiceItem[] = []
}

export class InvoiceItem {
    id: number = 0;
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
    created_at: string = '';
    updated_at: string = '';
    items: Item2[] = [];
    invoice_item_files: Files[] = [];
}

export class Item2 {
    id: number = 0;
    itemName: string = '';
    itemDesc: string = '';
    itemSource: string = '';
    itemStatus: string = '';
    created_at: string = '';
    updated_at: string = '';
    pivot: {
        invoice_item_id: number;
        item_id: number;
    } = {
            invoice_item_id: 0,
            item_id: 0,
        };
}

export class Files {
    id: number = 0;
    invoiceItemID: number = 0;
    level: string = '';
    filename: string = '';
    path: string = '';
    created_at: string = '';
    updated_at: string = '';
}