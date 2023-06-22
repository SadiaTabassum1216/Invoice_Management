import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

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


  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.http.get<any[]>('http://localhost:8000/api/users').subscribe(data => {

      this.userList = data;
      console.log(this.userList);
    });

  }


  // Function to edit a user
  editUser(user: User) {
    this.selectedUser = user;
    this.onEdit = true;
    console.log(this.selectedUser);
  }

  updateUser() {
    //send the data to backend
    this.http.put<any>('http://localhost:8000/api/user/${selectedUser.id}', this.selectedUser).subscribe(data => {
      console.log(this.selectedUser)
    });
    this.onEdit = false;

  }

  addUser() {
    //send the data to backend
    this.http.post<any>('http://localhost:8000/api/user', this.selectedUser).subscribe(data => {
      console.log(this.newUser)
    });
    this.userList.push(this.newUser);
    this.addUserFormVisible = false;
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

