import { Component, ElementRef, ViewChild } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { backendEnvironment } from 'src/environments/backendEnvironment';


@Component({
  selector: 'app-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.scss']
})
export class InvoicelistComponent {
  invoices: Invoice[] = [];
  selectedInvoice: Invoice=new Invoice();

  totalInvoice: number=0;
  totalGrandTotal: number=0;
  totalCost: number=0;
  totalDone: number=0;

  constructor(private http: HttpClient, private dialogModel: MatDialog) {
    
    this.getInvoices();
  }
  
  getInvoices() {
    const item1: Item = {
      itemId: 'A001',
      userId: 'User1',
      UOMId: 'UOM1',
      firstPrice: 0,
      lastPrice: 0,
      quantity: 0,
      VAT: 0,
      unitPrice: 0,
      additionalCost: 0,
      purchaseAdditionalCost: 0,
      deliveryAdditionalCost: 0,
      totalPrice: 0,
      POD: '',
      closingDate: new Date(),
      purchasePrice: 0,
      isFirstPaymentDone: false,
      firstPaymentPrice: 0,
      firstPaymentDate: new Date(),
      isLastPaymentDone: false,
      lastPaymentPrice: 0,
      lastPaymentDate: new Date(),
      logisticCompany: '',
      logisticLocation: '',
      logisticEstimatedDate: new Date(),
      shippingStatus: '',
      isDeliveredToIraq: false,
      isDeliveredByLogistic: false,
      isDeliverToClient: false,
      logisticCost: 0,
      isFullyPaid: false,
      isSubmitted: false,
      status: 'nice',
      uploadedFiles1: [],
      uploadedFiles2: [],
      uploadedFiles3: []
    };

    const item2: Item = {
      itemId: 'A002',
      userId: 'User2',
      UOMId: 'UOM2',
      firstPrice: 0,
      lastPrice: 0,
      quantity: 0,
      VAT: 0,
      unitPrice: 0,
      additionalCost: 0,
      purchaseAdditionalCost: 0,
      deliveryAdditionalCost: 0,
      totalPrice: 0,
      POD: '',
      closingDate: new Date(),
      purchasePrice: 0,
      isFirstPaymentDone: false,
      firstPaymentPrice: 0,
      firstPaymentDate: new Date(),
      isLastPaymentDone: false,
      lastPaymentPrice: 0,
      lastPaymentDate: new Date(),
      logisticCompany: '',
      logisticLocation: '',
      logisticEstimatedDate: new Date(),
      shippingStatus: '',
      isDeliveredToIraq: false,
      isDeliveredByLogistic: false,
      isDeliverToClient: false,
      logisticCost: 0,
      isFullyPaid: false,
      isSubmitted: false,
      status: 'good',
      uploadedFiles1: [],
      uploadedFiles2: [],
      uploadedFiles3: []
    };

    const invoice1: Invoice = {
      invoiceID: 'INV001',
      invoiceDate: new Date(),
      invoiceEstimatedDate: new Date(),
      invoiceClosingDate: new Date(),
      itemList: [item1, item2],
      offering: 'Offering1',
      subtotal: 100,
      grandTotal: 70,
      additionalCost: 20,
      totalCost: 200,
      status: 'Pending',
      isDone: false
    };

    const invoice2: Invoice = {
      invoiceID: 'INV002',
      invoiceDate: new Date(),
      invoiceEstimatedDate: new Date(),
      invoiceClosingDate: new Date(),
      itemList: [item1],
      offering: 'Offering2',
      subtotal: 50,
      grandTotal: 60,
      additionalCost: 10,
      totalCost: 100,
      status: 'Completed',
      isDone: true
    };
    this.invoices.push(invoice1, invoice2);
    
    //stat
    this.totalInvoice=this.invoices.length;

    for (let inv of this.invoices){
      this.totalGrandTotal+=inv.grandTotal;
      this.totalCost+=inv.totalCost;
      if(inv.isDone){
        this.totalDone++;
      }
    }

    this.http.get<any[]>(`${backendEnvironment.apiUrl}/api/invoice`).subscribe(data => {
    this.invoices = data;
    // console.log(this.invoices);
  });
  }


viewInvoice(invoice: Invoice) {
  console.log('View Invoice:', invoice.invoiceID);

  this.selectedInvoice = invoice;
  console.log(this.selectedInvoice);

  this.dialogModel.open(ViewInvoiceComponent, {
    disableClose: true,
    data: {
      invoice: this.selectedInvoice
    }
  });
}

editInvoice(invoice: Invoice) {
  console.log('Edit Invoice:', invoice.invoiceID);
  this.selectedInvoice = invoice;

  this.dialogModel.open(EditInvoiceComponent, {
    disableClose: true,
    data: {
      invoice: this.selectedInvoice
    }
  });

  this.http.put<any>(`${backendEnvironment.apiUrl}/api/invoice/${invoice.invoiceID}`, invoice).subscribe(data => {
    console.log(invoice);
  });
}

confirmDelete(invoice: Invoice): void {
  const confirmation = window.confirm('Are you sure you want to delete?');
  if (confirmation) 
    this.deleteInvoice(invoice);
  }


deleteInvoice(invoice: Invoice) {
  const index = this.invoices.indexOf(invoice);
  if (index !== -1) {
    this.invoices.splice(index, 1);
  }


  this.http.delete<any>(`${backendEnvironment.apiUrl}/api/invoice/${invoice.invoiceID}`).subscribe(
    data => {
      // console.log("Item deleted successfully");
      window.location.reload();
    },
    error => {
      console.log(error);
    }
  );
}



filterOptions: string[] = ['Date Range', 'Status', 'Is Done'];
selectedFilters: string[] = [];

// Input variables
startDate: Date = new Date();
endDate: Date = new Date();
status: string = '';
isDone: string = '';


// Filter visibility
filterOptionsVisible: boolean = false;
toggleFilterOptionsVisibility() {
  this.filterOptionsVisible = !this.filterOptionsVisible;
}


// Filtered data
filteredInvoices: Invoice[] =this.invoices;
applyFilters() {
  let filteredInvoices = this.invoices;

  if (this.selectedFilters.includes('Date Range')) {
    filteredInvoices = filteredInvoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.invoiceDate);
      return invoiceDate >= this.startDate && invoiceDate <= this.endDate;
    });
  }

  if (this.selectedFilters.includes('Status')) {
    if (this.status !== null) {
      filteredInvoices = filteredInvoices.filter((invoice) => invoice.status === this.status);
    }
  }
  
  if (this.selectedFilters.includes('Is Done')) {
    filteredInvoices = filteredInvoices.filter((invoice) => {
      if (this.isDone === 'Yes') {
        return invoice.isDone === true;
      } else if (this.isDone === 'No') {
        return invoice.isDone === false;
      } else {
        return true;
      }
    });
  }
  
  this.filteredInvoices = filteredInvoices;
}


removeFilter(filter: string) {
  const index = this.selectedFilters.indexOf(filter);
  if (index !== -1) {
    this.selectedFilters.splice(index, 1);
  }
  this.filteredInvoices=this.invoices;
  this.applyFilters();
}

  
}
