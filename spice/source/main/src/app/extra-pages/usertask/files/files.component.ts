import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Invoice } from 'src/app/models/invoice.model';
import { Item } from 'src/app/models/item.model';
import { FormsModule } from '@angular/forms';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { InvoiceItem3 } from 'src/app/models/invoice3.model';
import { InvoiceItem } from 'src/app/models/invoice2.model';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent {
  selectedItem: InvoiceItem = new InvoiceItem();
  dialogConfig?: MatDialogConfig;
  // backendEnvironment: any;
  link: string= backendEnvironment.apiUrl;
  // item: InvoiceItem3= new InvoiceItem3();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public dialog: MatDialog) {
    this.selectedItem = data.item;
    //  this.item= data.item;
     console.log("Selected Item is: ",this.selectedItem);
  }

  download() {
    this.http.post<any>(`${backendEnvironment.apiUrl}/api/invoice_item/${this.selectedItem.id}`, this.selectedItem).subscribe(data => {
      console.log(this.selectedItem);
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
