import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { AddModalComponent } from './add-modal/add-modal.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList: any;
  onEdit: boolean = false;
  addUserFormVisible: boolean = false;
  selectedUser: User = new User(0, '', '', '');
  newUser: User = new User(0, '', '', '');

  dialogConfig?: MatDialogConfig;
  constructor(private http: HttpClient,  private dialogModel: MatDialog) { }
  
  ngOnInit(): void {
    this.getList();
  }

  openDialog2(): void {
    this.dialogModel.open(AddModalComponent, {
      width: '640px',
      disableClose: true,
    });
  }


  getList() {
    this.http.get<any[]>('http://localhost:8000/api/users').subscribe(data => {

      this.userList = data;
      console.log(this.userList);
    });

  }

  editUser(user: User) {
    this.selectedUser = user;
    this.onEdit = true;
    console.log(this.selectedUser);
  
    // Pass the selected user as data to the EditModalComponent
    this.dialogModel.open(EditModalComponent, {
      width: '640px',
      disableClose: true,
      data: {
        user: this.selectedUser
      }
    });
  }
  

  deleteUser(userID: number) {
    const userIndex = this.userList.data.findIndex((user: { userID: number; }) => user.userID === userID);
    if (userIndex !== -1) {
      this.userList.data.splice(userIndex, 1);
    }
  
    this.http.delete<any>(`http://localhost:8000/api/users/${userID}`).subscribe(
      data => {
        console.log("User deleted successfully");
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }
  
}

