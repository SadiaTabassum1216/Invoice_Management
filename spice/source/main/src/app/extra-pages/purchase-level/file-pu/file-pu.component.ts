import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { InvoiceItem } from 'src/app/models/invoice2.model';

@Component({
  selector: 'app-file-pu',
  templateUrl: './file-pu.component.html',
  styleUrls: ['./file-pu.component.scss']
})
export class FilePuComponent {
  selectedItem: InvoiceItem = new InvoiceItem();
  dialogConfig?: MatDialogConfig;
  // backendEnvironment: any;
  link: string= backendEnvironment.apiUrl;
  // item: InvoiceItem3= new InvoiceItem3();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public dialog: MatDialog) {
    this.selectedItem = data.item;
    //  this.item= data.item;
    //  console.log("Selected Item is: ",this.selectedItem);
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

  close(){
    this.dialog.closeAll();
  }
}
