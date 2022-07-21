export class Player {
  name: string;
  avatar: string;
  money: number;
  constructor(name: string, avatar: string) {
    this.name = name;
    this.avatar = avatar;
    this.money = 0;
  }
}
