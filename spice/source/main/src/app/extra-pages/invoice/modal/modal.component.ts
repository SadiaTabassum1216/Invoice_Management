
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { backendEnvironment } from 'src/environments/backendEnvironment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  uploadedFilePaths: string[] = [];
  
  uploadedFile: File[]=[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<ModalComponent>,
  private http: HttpClient) {
    this.uploadedFilePaths = data.filePaths;
    this.uploadedFile=data;
    console.log(this.uploadedFile);
  }

  deleteFile(filePath: string): void {
    const index = this.uploadedFilePaths.indexOf(filePath);
    if (index !== -1) {
      this.uploadedFilePaths.splice(index, 1);
    }
  }

  redirectToPath(filePath: string): void {
    this.http.get<any>(`${backendEnvironment.apiUrl}/api//file_download/filepath`).subscribe(
      (response) => {
        const fetchedFilePath = response.filePath; 
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
