import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { InvoiceItem } from 'src/app/models/invoice2.model';

@Component({
  selector: 'app-file-pr',
  templateUrl: './file-pr.component.html',
  styleUrls: ['./file-pr.component.scss']
})
export class FilePrComponent {
  selectedItem: InvoiceItem = new InvoiceItem();
  dialogConfig?: MatDialogConfig;
  link: string = backendEnvironment.apiUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public dialog: MatDialog) {
    this.selectedItem = data.item;
    // console.log("Selected Item is: ", this.selectedItem);
  }

  download() {
    this.http.post<any>(`${backendEnvironment.apiUrl}/api/invoice_item/${this.selectedItem.id}`, this.selectedItem).subscribe(data => {
      // console.log(this.selectedItem);
    },
    error => {      
      console.error('An error occurred:', error);
    }
    );
    this.dialog.closeAll();
  }

  close() {
    this.dialog.closeAll();
  }

}
