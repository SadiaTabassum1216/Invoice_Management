export class Room {
  id: number;
  roomNo: string;
  type: string;
  acNonac: string;
  meal: string;
  capacity: string;
  phone: string;
  rent: string;
  constructor(room: Room) {
    {
      this.id = room.id || this.getRandomID();
      this.roomNo = room.roomNo || '';
      this.type = room.type || '';
      this.acNonac = room.acNonac || '';
      this.meal = room.meal || '';
      this.capacity = room.capacity || '';
      this.phone = room.phone || '';
      this.rent = room.rent || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
