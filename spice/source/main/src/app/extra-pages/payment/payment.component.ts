import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { PaymentViewModalComponent } from './payment-view-modal/payment-view-modal.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  invoices: any;


  public currentUser: Observable<AuthUser> | undefined;
  roles:string[]=[];

  constructor(private http: HttpClient,   private authService: AuthService, private router: Router,
     private dialog: MatDialog) {}

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
    this.http.get<any[]>(`${backendEnvironment.apiUrl}/api/invoicePayments`).subscribe(data => {
      this.invoices = data;
      // console.log(this.invoices);
    });
  }

  openModal(invoice: any) {
    this.dialog.open(PaymentViewModalComponent, {
      width: '1000px',
      data: { invoice: invoice } ,
      disableClose: true,
    });
  }
}
