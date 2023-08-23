import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { InvoiceItem3 } from 'src/app/models/invoice3.model';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-edit-p',
  templateUrl: './edit-p.component.html',
  styleUrls: ['./edit-p.component.scss'],
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

  returnStringOrNull(val: any | null) {
    if (val == null) return val;
    else return val.toString();
  }

  update() {
    this.formData.append('id', this.returnStringOrNull(this.selectedItem.id));
    this.formData.append(
      'invoiceID',
      this.returnStringOrNull(this.selectedItem.invoiceID)
    );
    this.formData.append(
      'invoiceItemIsFirstPaymentDone',
      this.returnStringOrNull(this.selectedItem.invoiceItemIsFirstPaymentDone)
    );
    this.formData.append(
      'invoiceItemFirstPaymentPrice',
      this.returnStringOrNull(this.selectedItem.invoiceItemFirstPaymentPrice)
    );
    this.formData.append(
      'invoiceItemFirstPaymentDate',
      this.returnStringOrNull(this.selectedItem.invoiceItemFirstPaymentDate)
    );
    this.formData.append(
      'invoiceItemIsLastPaymentDone',
      this.returnStringOrNull(this.selectedItem.invoiceItemIsLastPaymentDone)
    );
    this.formData.append(
      'invoiceItemLastPaymentPrice',
      this.returnStringOrNull(this.selectedItem.invoiceItemLastPaymentPrice)
    );
    this.formData.append(
      'invoiceItemLastPaymentDate',
      this.returnStringOrNull(this.selectedItem.invoiceItemLastPaymentDate)
    );
    this.formData.append(
      'invoiceItemLogisticCompany',
      this.returnStringOrNull(this.selectedItem.invoiceItemLogisticCompany)
    );
    this.formData.append(
      'invoiceItemLogisticLocation',
      this.returnStringOrNull(this.selectedItem.invoiceItemLogisticLocation)
    );
    this.formData.append(
      'invoiceItemLogisitEstimatedDate',
      this.returnStringOrNull(this.selectedItem.invoiceItemLogisitEstimatedDate)
    );
    this.formData.append(
      'invoiceItemShippingStatus',
      this.returnStringOrNull(this.selectedItem.invoiceItemShippingStatus)
    );
    this.formData.append(
      'invoiceItemDeliveredToIraq',
      this.returnStringOrNull(this.selectedItem.invoiceItemDeliveredToIraq)
    );
    this.formData.append(
      'invoiceItemDeliverByLogisic',
      this.returnStringOrNull(this.selectedItem.invoiceItemDeliverByLogisic)
    );
    this.formData.append(
      'invoiceItemDeliverToClient',
      this.returnStringOrNull(this.selectedItem.invoiceItemDeliverToClient)
    );
    this.formData.append(
      'invoiceItemLogisticCost',
      this.returnStringOrNull(this.selectedItem.invoiceItemLogisticCost)
    );
    this.formData.append(
      'invoiceItemFullPaid',
      this.returnStringOrNull(this.selectedItem.invoiceItemFullPaid)
    );
    this.formData.append(
      'invoiceItemSubmitted',
      this.returnStringOrNull(this.selectedItem.invoiceItemSubmitted)
    );
    this.formData.append(
      'invoiceItemStatus',
      this.returnStringOrNull(this.selectedItem.invoiceItemStatus)
    );

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
