import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnInit {
  invoices: any[] = [
    {
      id: 1,
      datetime: new Date('2023-08-01T09:00:00'),
      subtotal: 100,
      grandtotal: 90,
      discount: 10,
      finalprice: 90,
      isFullyPaid: true
    },
    {
      id: 2,
      datetime: new Date('2023-08-02T14:30:00'),
      subtotal: 150,
      grandtotal: 120,
      discount: 30,
      finalprice: 120,
      isFullyPaid: false
    },
    {
      id: 3,
      datetime: new Date('2023-08-03T11:45:00'),
      subtotal: 200,
      grandtotal: 180,
      discount: 20,
      finalprice: 180,
      isFullyPaid: false
    }
  ];


  public currentUser: Observable<AuthUser> | undefined;
  roles:string[]=[];

  constructor(private http: HttpClient,   private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    // this.fetchInvoices();
    this.currentUser=this.authService.currentUser;
    this.currentUser.subscribe(info => {
      this.roles=info['user']['roles'];
    });
    if (!this.roles.includes('admin')) {
      this.router.navigate(['/**']); 
    }
  }

  fetchInvoices() {
    this.http.get<any[]>(`${backendEnvironment.apiUrl}/api/invoices`).subscribe(data => {
      this.invoices = data;
    });
  }

  openPaymentModal(invoice: any) {
    this.dialog.open(PaymentModalComponent, {
      width: '640px',
      data: { invoice: invoice } ,
      disableClose: true,
    });
  }
}