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
  invoices: any;


  public currentUser: Observable<AuthUser> | undefined;
  roles:string[]=[];

  constructor(private http: HttpClient,   private authService: AuthService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
     this.fetchInvoices();
    this.currentUser=this.authService.currentUser;
    this.currentUser.subscribe(info => {
      this.roles=info['user']['roles'];
    });
    if (!this.roles.includes('admin')) {
      this.router.navigate(['/**']); 
    }
  }

  fetchInvoices() {
    this.http.get<any[]>(`${backendEnvironment.apiUrl}/api/invoice`).subscribe(data => {
      this.invoices = data;
      console.log(this.invoices);
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