export interface Asset {
  _id: string;
  type: string; // For sale/rent //
  address: string;
  price: number;
  description: string;
  category: string; // cottage, penthouse, villa... //
  roomsAmount: number;
  size: number;
  photos: File[];
  neighborhood: string;
  totalFloors: number;
  assetFloor: number;
  entranceDate: Date;
  isAirCondition: boolean;
  isElevator: boolean;
  isBalcony: boolean;
  isParking: boolean;
  isShield: boolean;
  isStroeroom: boolean;
}
