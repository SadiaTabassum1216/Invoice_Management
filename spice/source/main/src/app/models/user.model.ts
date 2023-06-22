export class User {
    id: number;
    name: string;
    username: string;
    status: string;
    password:string='';
  
    constructor(userID: number, fullName: string, username: string, userStatus: string) {
      this.id = userID;
      this.name = fullName;
      this.username = username;
      this.status = userStatus;
    }
  }
  