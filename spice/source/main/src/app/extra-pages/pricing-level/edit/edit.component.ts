import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { InvoiceItem3 } from 'src/app/models/invoice3.model';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
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

    // this.http.post<any>(
    //   `${backendEnvironment.apiUrl}/api/updatePricingLevel/${this.selectedItem.id}`,
    //   this.formData
    // )
    // .subscribe((data) => {
    //   console.log(data);
    // });

    console.log('Files uploaded successfully');

    this.selectedFiles = null;
  }

  update() {
    // this.formData.forEach((value, key) => {
    //   console.log(key, value);
    // });
    // this.formData.append('item', this.selectedItem);
//     this.selectedItem.array.forEach((element: { key: any; }) => {
//       console.log(element.key);
//     });
   
//     for (const property in this.selectedItem) {
//       if (this.selectedItem.hasOwnProperty(property)) {
//           // this.formData.append(`itemList.${property}`, this.selectedItem[property]);
// console.log(this.selectedItem[property]);
//       }
//   }


this.formData.append('id', this.selectedItem.id.toString());
this.formData.append('invoiceID', this.selectedItem.invoiceID.toString());
this.formData.append('invoiceItemFirstPrice', this.selectedItem.invoiceItemFirstPrice.toString());
this.formData.append('invoiceItemLastPrice', this.selectedItem.invoiceItemLastPrice.toString());
this.formData.append('invoiceItemVAT', this.selectedItem.invoiceItemVAT.toString());
this.formData.append('invoiceItemPurchasePrice', this.selectedItem.invoiceItemPurchasePrice.toString());
this.formData.append('invoiceItemStatus', this.selectedItem.invoiceItemStatus.toString());
    this.http
      .post<any>(
        `${backendEnvironment.apiUrl}/api/update/${this.selectedItem.id}`,
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
