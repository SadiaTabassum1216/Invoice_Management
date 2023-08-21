import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { backendEnvironment } from 'src/environments/backendEnvironment';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent {
  selectedUser: User = new User(0, '', '',[]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient,  public dialog: MatDialog) {
    this.selectedUser=data.user;
  }

  updateUser() {
    console.log(this.selectedUser);
    this.http.put<any>(`${backendEnvironment.apiUrl}/api/users/${this.selectedUser.id}`, this.selectedUser).subscribe(data => {
  // console.log(this.selectedUser);
});
    this.dialog.closeAll();
  }

  close(){
    this.dialog.closeAll();
  }

}