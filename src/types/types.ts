type TTags = {
  name: string;
  isDeleted: boolean;
};
export type TProduct = {
  _id?: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  model: string;
  operatingSystem: string;
  storage: number;
  screenSize: number;
  details: string;
  tags?: [TTags];
  createdAt?: string;
  updatedAt?: string;
};
