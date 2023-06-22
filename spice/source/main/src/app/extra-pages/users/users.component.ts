import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent  implements OnInit{
  userList: User[] = [];
  onEdit: boolean=false;
  addUserFormVisible: boolean=false;
  selectedUser: User = new User(0,'','',false);
  newUser: User = new User(0,'','',false);
 constructor(private http:HttpClient) { }
  ngOnInit(): void {
   this.getList();
  }

  getList() {
    this.http.get<any[]>('http://localhost:8000/getUser').subscribe(data => {
      // this.userList = data;
      
    });

    this.userList = [
      new User(1, 'abc', 'johndoe', true),
      new User(2, 'cde', 'janesmith', false),
      new User(3, 'asd', 'bobjohnson', true),     
    ];
      
  }

  
  // Function to edit a user
  editUser(user: User) {
   this.selectedUser=user;
   this.onEdit=true;
   console.log(this.selectedUser);
  }

  updateUser(){
    //send the data to backend
    this.http.post<any>('http://localhost:8000/user', this.selectedUser).subscribe(data => {
    console.log(this.selectedUser)  
    });
    this.onEdit=false;
   
  }

 addUser(){
  //send the data to backend
  this.http.post<any>('http://localhost:8000/newuser', this.selectedUser).subscribe(data => {
    console.log(this.newUser)  
    });
  this.userList.push(this.newUser);
  this.addUserFormVisible=false;
 }


  deleteUser(deleteduser: User) {  
    const userIndex = this.userList.findIndex(user => user.userID === deleteduser.userID);
    if (userIndex !== -1) {
      this.userList.splice(userIndex, 1);
    }
    this.http.post<any>('http://localhost:8000/deleteduser', deleteduser).subscribe(data => {
      console.log(deleteduser)  
      });
    //send the updates to database
  }
}

