import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { backendEnvironment } from 'src/environments/backendEnvironment';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent {
  paymentDone: boolean = false;
  dialogConfig?: MatDialogConfig;
  paymentAmount: number = 0;
  paymentNote: string=''; 
   selectedFile: File | null | undefined;
  payment: any;


  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  
  handleFileChange(event: any) {
    this.selectedFile =  event.target.files[0];
  }

  formData: FormData = new FormData();
  submitPayment() {
    this.payment = {
      time: new Date(),
      amount: this.paymentAmount,
      note: this.paymentNote,
      file: this.selectedFile,
    }

    this.formData.append('time', this.payment.time.toISOString());
    this.formData.append('amount', this.payment.amount);
    this.formData.append('note', this.payment.note);
    if(this.selectedFile!=null){
      this.formData.append('attachment', this.selectedFile, this.selectedFile.name);
    }
    
    this.http
      .post<any>(`${backendEnvironment.apiUrl}/api/payment`, this.formData)
      .subscribe((data) => {
        console.log(data);
      });

    this.dialog.closeAll();
  }
  closeModal() {
    this.dialog.closeAll();
  }

}
