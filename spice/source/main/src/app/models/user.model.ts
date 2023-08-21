export class User {
    id: number;
    name: string;
    username: string;
    status: string='offline';
    roles: string[]=[];
    password:string='';
  
    constructor(userID: number, fullName: string, username: string, roles: string[]) {
      this.id = userID;
      this.name = fullName;
      this.username = username;
      this.roles = roles;
    }
  }
  