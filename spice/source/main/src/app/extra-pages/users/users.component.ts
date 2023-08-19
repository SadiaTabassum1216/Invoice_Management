import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import { AuthService } from 'src/app/core/service/auth.service';
import { Observable } from 'rxjs';
 import { AuthUser } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { backendEnvironment } from 'src/environments/backendEnvironment';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList: any;
 
  public currentUser: Observable<AuthUser> | undefined;
  id: number=0;

  
  selectedUser: User = new User(0, '', '',[]);
  newUser: User = new User(0, '', '',[]);

  dialogConfig?: MatDialogConfig;
  constructor(private http: HttpClient,  
    private dialogModel: MatDialog, 
    private authService: AuthService,
    private router: Router) { }
  
  ngOnInit(): void {
     this.getList();
    this.currentUser=this.authService.currentUser;
    this.currentUser.subscribe(info => {
     
      this.id=info['user']['id'];
      // console.log("Current user id ",  this.id);
    });

    if (this.id !== 1) {
      this.router.navigate(['/**']);
    }
  }

  openDialog2(): void {
    this.dialogModel.open(AddModalComponent, {
      width: '640px',
      disableClose: true,
    });
  }


  getList() {
    this.http.get<any[]>(`${backendEnvironment.apiUrl}/api/users`).subscribe(data => {

      this.userList = data;
       console.log(this.userList);
    });

  }

  editUser(user: User) {
    this.selectedUser = user;
    // console.log(this.selectedUser);
  
    this.dialogModel.open(EditModalComponent, {
      width: '640px',
      disableClose: true,
      data: {
        user: this.selectedUser
      }
    });
  }

  confirmDelete(userID: number): void {
    const confirmation = window.confirm('Are you sure you want to delete?');
    if (confirmation) 
      this.deleteUser(userID);
    }
  

  deleteUser(userID: number) {
    const userIndex = this.userList.data.findIndex((user: { userID: number; }) => user.userID === userID);
    if (userIndex !== -1) {
      this.userList.data.splice(userIndex, 1);
    }
  
    this.http.delete<any>(`${backendEnvironment.apiUrl}/api/users/${userID}`).subscribe(
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

