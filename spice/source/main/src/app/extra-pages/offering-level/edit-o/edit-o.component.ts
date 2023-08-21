import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { backendEnvironment } from 'src/environments/backendEnvironment';
import { InvoiceItem3 } from 'src/app/models/invoice3.model';
import { AuthUser } from 'src/app/core/models/user';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-edit-o',
  templateUrl: './edit-o.component.html',
  styleUrls: ['./edit-o.component.scss']
})
export class EditOComponent implements OnInit{
  selectedItem: InvoiceItem3 = new InvoiceItem3();
  dialogConfig?: MatDialogConfig;
  public currentUser: Observable<AuthUser> | undefined;
 roles: string[]=[];
  // item: InvoiceItem3= new InvoiceItem3();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, public dialog: MatDialog, private authService: AuthService) {
    this.selectedItem = data.item;
     console.log("Selected Item is: ",this.selectedItem);
    
  }
  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.currentUser.subscribe(info => {
      this.roles = info['user']['roles'];
   
    });
    
  }

  selectedFiles: FileList | null | undefined;


  onFileSelect(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadFiles(targetArray: File[]): void {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      console.log('No files to upload.');
      return;
    }

    const formData: FormData = new FormData();

    for (let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      targetArray.push(file);
      formData.append('files[]', file);
    }

    console.log('Files uploaded successfully');

    this.selectedFiles = null;
  }
  



  update() {
    this.http.put<any>(`${backendEnvironment.apiUrl}/api/invoice_item/${this.selectedItem.id}`, this.selectedItem).subscribe(data => {
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
