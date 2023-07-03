import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { backendEnvironment } from 'src/environments/backendEnvironment';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent {
  newUser: User = new User(0, '', '');
  constructor(private http: HttpClient,  public dialog: MatDialog) { }


  addUser() {
    this.http.post<any>(`${backendEnvironment.apiUrl}/api/users`, this.newUser).subscribe(data => {
      console.log(this.newUser);
    });
    //  window.location.reload();
     this.dialog.closeAll();
      // window.location.reload();
    // this.userList.push(this.newUser);
    // this.addUserFormVisible = false;
  }

  close(){
    this.dialog.closeAll();
  }


}
