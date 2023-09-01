import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as XLSX from "xlsx";
import { AuthService } from 'src/app/core/service/auth.service';
import { Observable } from 'rxjs';
import { AuthUser } from 'src/app/core/models/user';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { InvoiceItem } from 'src/app/models/invoice2.model';
import { InvoiceItem3 } from 'src/app/models/invoice3.model';
import { EditOComponent } from './edit-o/edit-o.component';
import { FileOComponent } from './file-o/file-o.component';
@Component({
  selector: 'app-offering-level',
  templateUrl: './offering-level.component.html',
  styleUrls: ['./offering-level.component.scss']
})
export class OfferingLevelComponent implements OnInit{
  public currentUser: Observable<AuthUser> | undefined;
  name: string = '';
  id: number = 0;

  ngOnInit(): void {
    this.getItemList();
    this.currentUser = this.authService.currentUser;
    this.currentUser.subscribe(info => {
      this.name = info['user']['name'];
      this.id = info['user']['id'];
      // console.log("Current user id ",  this.id);
    });
  }

  constructor(private http: HttpClient, private dialogModel: MatDialog, private authService: AuthService) { }

  items: any;
  selectedItem: InvoiceItem3 = new InvoiceItem3();
  selectedItem2: InvoiceItem = new InvoiceItem();
  dialog?: MatDialogRef<EditOComponent>;



  filename = 'items.xlsx';

  getItemList() {
    this.http.get<any[]>(`${backendEnvironment.apiUrl}/api/invoiceitems`).subscribe(data => {
      this.items = data;
      //  console.log(this.items);
    });

  }


  edit(item: InvoiceItem3): void {
    this.selectedItem = item;
   

    this.dialogModel.open(EditOComponent, {
      width: '740px',
      disableClose: true,
      data: {
        item: this.selectedItem
      }
    });

  }


  confirmDelete(item: InvoiceItem): void {
    const confirmation = window.confirm('Are you sure you want to delete?');
    if (confirmation)
      this.delete(item);
  }

  

  view(item: InvoiceItem) {
    this.selectedItem2 = item;
    // console.log(this.selectedItem2);

    this.dialogModel.open(FileOComponent, {
      width: '740px',
      disableClose: true,
      data: {
        item: this.selectedItem2
      }
    });
  }

  delete(item: InvoiceItem): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }

    this.http.delete<any>(`${backendEnvironment.apiUrl}/api/invoiceItem/${item.id}`).subscribe(
      data => {
        // console.log("Item deleted successfully");
        window.location.reload();
      },
      error => {
        // console.log(error);
      }
    );

  }
  
  exportList() {
    let element = document.getElementById('excel')

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
    XLSX.writeFile(wb, this.filename)

  }
 
}
