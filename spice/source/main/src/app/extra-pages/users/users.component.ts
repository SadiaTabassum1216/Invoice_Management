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
  //  constructor(private modalService: NgbModal) { }
  ngOnInit(): void {
   this.getList();
  }

  

  getList() {
    //use url to fetch the userlist from database
    this.userList = [
      new User(1, 'abc', 'johndoe', true),
      new User(2, 'cde', 'janesmith', false),
      new User(3, 'asd', 'bobjohnson', true),     
    ];
  
  }
  
  open(content: any) {   
    this.onEdit=true;
    // this.modalService.open(content);
   
  }

  // Function to edit a user
  editUser(user: User) {
   this.selectedUser=user;
   this.onEdit=true;
   console.log(this.selectedUser);
  }

  updateUser(){
    //send the data to backend
    this.onEdit=false;
   
  }

 addUser(){
  //send the data to backend
  this.userList.push(this.newUser);
  this.addUserFormVisible=false;
 }


  deleteUser(userID: number) {  
    const userIndex = this.userList.findIndex(user => user.userID === userID);

    if (userIndex !== -1) {
      this.userList.splice(userIndex, 1);
    }

    //send the updates to database
  }
}

