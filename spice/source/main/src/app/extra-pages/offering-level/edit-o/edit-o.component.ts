import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { InvoiceItem3 } from 'src/app/models/invoice3.model';
import { AuthUser } from 'src/app/core/models/user';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-edit-o',
  templateUrl: './edit-o.component.html',
  styleUrls: ['./edit-o.component.scss'],
})
export class EditOComponent implements OnInit {
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
    // console.log('Selected Item is: ', this.selectedItem);
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
  uploadSuccess = false;
  uploadFiles(targetArray: File[]): void {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      // console.log('No files to upload.');
      return;
    }

    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      targetArray.push(file);
      this.formData.append('files[]', file);
    }
    // console.log('Files uploaded successfully');

    this.selectedFiles = null;
    this.uploadSuccess=true;
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
      'invoiceItemUnitPrice',
      this.returnStringOrNull(this.selectedItem.invoiceItemUnitPrice)
    );
    this.formData.append(
      'invoiceItemQouteAdditionalCost',
      this.returnStringOrNull(this.selectedItem.invoiceItemQouteAdditionalCost)
    );
    this.formData.append(
      'invoiceitemPurchaseAdditionalCost',
      this.returnStringOrNull(
        this.selectedItem.invoiceitemPurchaseAdditionalCost
      )
    );
    this.formData.append(
      'invoiceItemDeliveryAdditionalCost',
      this.returnStringOrNull(
        this.selectedItem.invoiceItemDeliveryAdditionalCost
      )
    );
    this.formData.append(
      'invoiceItemPOD',
      this.returnStringOrNull(this.selectedItem.invoiceItemPOD)
    );
    this.formData.append(
      'invoiceItemClosingDate',
      this.returnStringOrNull(this.selectedItem.invoiceItemClosingDate)
    );
    this.formData.append(
      'invoiceItemStatus',
      this.returnStringOrNull(this.selectedItem.invoiceItemStatus)
    );

    this.http
      .post<any>(
        `${backendEnvironment.apiUrl}/api/updateOfferingLevel/${this.selectedItem.id}`,
        this.formData
      )
      .subscribe((data) => {
        // console.log(data);
      });
    this.dialog.closeAll();
  }

  close() {
    this.dialog.closeAll();
  }
}
