export class AuthUser {
  [x: string]: any;
  id!: number;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  roles: string[]=[];
  token!: string;
}
