export class User {
    id: number;
    name: string;
    username: string;
    status: string='offline';
    role: string[]=[];
    password:string='';
  
    constructor(userID: number, fullName: string, username: string) {
      this.id = userID;
      this.name = fullName;
      this.username = username;
    }
  }
  