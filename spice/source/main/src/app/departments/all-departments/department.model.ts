export class Department {
  id: number;
  dName: string;
  hod: string;
  phone: string;
  email: string;
  totalStaff: string;
  constructor(department: Department) {
    {
      this.id = department.id || this.getRandomID();
      this.dName = department.dName || '';
      this.hod = department.hod || '';
      this.phone = department.phone || '';
      this.email = department.email || '';
      this.totalStaff = department.totalStaff || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
