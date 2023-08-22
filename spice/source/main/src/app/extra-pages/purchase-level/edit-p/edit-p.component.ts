import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { InvoiceItem3 } from 'src/app/models/invoice3.model';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-edit-p',
  templateUrl: './edit-p.component.html',
  styleUrls: ['./edit-p.component.scss']
})
export class EditPComponent {
  selectedItem: InvoiceItem3 = new InvoiceItem3();
  dialogConfig?: MatDialogConfig;
  public currentUser: Observable<AuthUser> | undefined;
  roles: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.selectedItem = data.item;
    console.log('Selected Item is: ', this.selectedItem);
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.currentUser.subscribe((info) => {
      this.roles = info['user']['roles'];
    });
  }

  selectedFiles: FileList | null | undefined;
  fileArray: File[] = [];

  onFileSelect(event: any): void {
    this.selectedFiles = event.target.files;
  }

  formData: FormData = new FormData();
  uploadFiles(targetArray: File[]): void {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      console.log('No files to upload.');
      return;
    }

    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      targetArray.push(file);
      this.formData.append('files[]', file);
    }
    console.log('Files uploaded successfully');

    this.selectedFiles = null;
  }

  update() {
        
this.formData.append('id', this.selectedItem.id.toString());
this.formData.append('invoiceID', this.selectedItem.invoiceID.toString());
this.formData.append('invoiceItemIsFirstPaymentDone', this.selectedItem.invoiceItemIsFirstPaymentDone.toString());
this.formData.append('invoiceItemFirstPaymentPrice', this.selectedItem.invoiceItemFirstPaymentPrice.toString());
this.formData.append('invoiceItemFirstPaymentDate', this.selectedItem.invoiceItemFirstPaymentDate.toString());
this.formData.append('invoiceItemIsLastPaymentDone', this.selectedItem.invoiceItemIsLastPaymentDone.toString());
this.formData.append('invoiceItemLastPaymentPrice', this.selectedItem.invoiceItemLastPaymentPrice.toString());
this.formData.append('invoiceItemLastPaymentDate', this.selectedItem.invoiceItemLastPaymentDate.toString());
this.formData.append('invoiceItemLogisticCompany', this.selectedItem.invoiceItemLogisticCompany.toString());
this.formData.append('invoiceItemLogisticLocation', this.selectedItem.invoiceItemLogisticLocation.toString());
this.formData.append('invoiceItemLogisitEstimatedDate', this.selectedItem.invoiceItemLogisitEstimatedDate.toString());
this.formData.append('invoiceItemShippingStatus', this.selectedItem.invoiceItemShippingStatus.toString());
this.formData.append('invoiceItemDeliveredToIraq', this.selectedItem.invoiceItemDeliveredToIraq.toString());
this.formData.append('invoiceItemDeliverByLogisic', this.selectedItem.invoiceItemDeliverByLogisic.toString());
this.formData.append('invoiceItemDeliverToClient', this.selectedItem.invoiceItemDeliverToClient.toString());
this.formData.append('invoiceItemLogisticCost', this.selectedItem.invoiceItemLogisticCost.toString());     
this.formData.append('invoiceItemFullPaid', this.selectedItem.invoiceItemFullPaid.toString());        
this.formData.append('invoiceItemSubmitted', this.selectedItem.invoiceItemSubmitted.toString());        
this.formData.append('invoiceItemStatus', this.selectedItem.invoiceItemStatus.toString());


    this.http
      .post<any>(
        `${backendEnvironment.apiUrl}/api/updatePurchaseLevel/${this.selectedItem.id}`,
        this.formData
      )
      .subscribe((data) => {
        console.log(data);
      });
    this.dialog.closeAll();
  }

  close() {
    this.dialog.closeAll();
  }
}
