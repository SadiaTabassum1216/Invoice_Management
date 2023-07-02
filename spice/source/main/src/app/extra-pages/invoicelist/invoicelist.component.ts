import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice2 } from 'src/app/models/invoice2.model';


@Component({
  selector: 'app-invoicelist',
  templateUrl: './invoicelist.component.html',
  styleUrls: ['./invoicelist.component.scss']
})
export class InvoicelistComponent implements OnInit {
  invoices: any;
  invoicelist: any[] = [];
  private invoicesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public invoices$: Observable<any[]> = this.invoicesSubject.asObservable();

  selectedInvoice: Invoice2 = new Invoice2();

  totalInvoice: number = 0;
  totalGrandTotal: number = 0;
  totalCost: number = 0;
  totalDone: number = 0;

  constructor(private http: HttpClient, private dialogModel: MatDialog) {


  }
  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {

    this.http.get<any[]>(`${backendEnvironment.apiUrl}/api/invoice`).subscribe(
      data => {
        this.invoices = data;
        console.log(data);
        this.filteredInvoices = this.invoices;

        //stat
        this.totalInvoice = this.invoices.data.length;

        for (let inv of this.invoices.data) {
          this.totalGrandTotal += inv.invoiceGrandtotal;
          this.totalCost += inv.invoiceTotalCost;
          if (inv.invoiceIsDone) {
            this.totalDone++;
          }
        }
      });



  }


  viewInvoice(invoice: Invoice2) {
    console.log('View Invoice:', invoice.id);

    this.selectedInvoice = invoice;
    console.log(this.selectedInvoice);

    this.dialogModel.open(ViewInvoiceComponent, {
      disableClose: true,
      data: {
        invoice: this.selectedInvoice
      }
    });
  }

  editInvoice(invoice: Invoice2) {
    console.log('Edit Invoice:', invoice.id);
    this.selectedInvoice = invoice;

    this.dialogModel.open(EditInvoiceComponent, {
      disableClose: true,
      data: {
        invoice: this.selectedInvoice
      }
    });

    this.http.put<any>(`${backendEnvironment.apiUrl}/api/invoice/${invoice.id}`, invoice).subscribe(data => {
      console.log(invoice);
    });
  }

  confirmDelete(invoice: Invoice2): void {
    const confirmation = window.confirm('Are you sure you want to delete?');
    if (confirmation)
      this.deleteInvoice(invoice);
  }


  deleteInvoice(invoice: Invoice2) {
    const index = this.invoices.data.indexOf(invoice);
    if (index !== -1) {
      this.invoices.data.splice(index, 1);
    }


    this.http.delete<any>(`${backendEnvironment.apiUrl}/api/invoice/${invoice.id}`).subscribe(
      data => {
         console.log("Invoice deleted successfully");
         console.log(data);
        // window.location.reload();
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
  filteredInvoices: any;


  applyFilters() {
    let filteredInvoices = this.invoices.data;

    if (this.selectedFilters.includes('Date Range')) {
      filteredInvoices = filteredInvoices.filter((invoice: { invoiceDate: string | number | Date; }) => {
        const invoiceDate = new Date(invoice.invoiceDate);
        return invoiceDate >= this.startDate && invoiceDate <= this.endDate;
      });
    }

    if (this.selectedFilters.includes('Status')) {
      if (this.status !== null) {
        filteredInvoices = filteredInvoices.filter((invoice: { invoiceStatus: string; }) => invoice.invoiceStatus === this.status);
      }
    }

    if (this.selectedFilters.includes('Is Done')) {
      filteredInvoices = filteredInvoices.filter((invoice: { invoiceIsDone: boolean; }) => {
        if (this.isDone === 'Yes') {
          return invoice.invoiceIsDone === true;
        } else if (this.isDone === 'No') {
          return invoice.invoiceIsDone === false;
        } else {
          return true;
        }
      });
    }

    this.filteredInvoices.data = filteredInvoices;
  }


  removeFilter(filter: string) {
    const index = this.selectedFilters.indexOf(filter);
    if (index !== -1) {
      this.selectedFilters.splice(index, 1);
    }
    // console.log("before remove",this.filteredInvoices);
    this.getOnlylist();   
     console.log("after remove",this.filteredInvoices);
    this.applyFilters();
  }

  getOnlylist(){
    this.http.get<any[]>(`${backendEnvironment.apiUrl}/api/invoice`).subscribe(
      data => {
        this.invoices = data;
        this.filteredInvoices = this.invoices;
      });
  }


}
