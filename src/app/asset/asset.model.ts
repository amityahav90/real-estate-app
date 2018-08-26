export class Asset {
  public type: string; // For sale/rent //
  public address: string;
  public price: number;
  public description: string;
  public isPrivate: boolean; // Private means not a building //
  public roomsAmount: number;
  public size: number;
  public photos: string[];

  constructor(type: string,
              address: string,
              price: number,
              description: string,
              isPrivate: boolean,
              roomsAmount: number,
              size: number,
              photos: string[]) {
    this.type = type;
    this.address = address;
    this.price = price;
    this.description = description;
    this.isPrivate = isPrivate;
    this.roomsAmount = roomsAmount;
    this.size = size;
    this.photos = photos;
  }
}
