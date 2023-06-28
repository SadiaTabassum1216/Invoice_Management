
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  uploadedFilePaths: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<ModalComponent>,
  private http: HttpClient) {
    this.uploadedFilePaths = data.filePaths;
    console.log(this.uploadedFilePaths);
  }

  deleteFile(filePath: string): void {
    const index = this.uploadedFilePaths.indexOf(filePath);
    if (index !== -1) {
      this.uploadedFilePaths.splice(index, 1);
    }
  }

  redirectToPath(filePath: string): void {
    this.http.get<any>('YOUR_API_ENDPOINT').subscribe(
      (response) => {
        const fetchedFilePath = response.filePath; // Adjust the property name as per your API response
        window.open(fetchedFilePath, '_blank');
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  close(): void {
    this.dialogRef.close();
  }
}
