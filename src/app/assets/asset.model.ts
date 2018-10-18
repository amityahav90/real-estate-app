export interface Asset {
  _id: string;
  type: string; // For sale/rent //
  address: string;
  price: number;
  description: string;
  isPrivate: boolean; // Private means not a building //
  roomsAmount: number;
  size: number;
  photos: File[];
}
