export interface IOveralTable {
  parishId: number | string;
  id: number | string;
  pic: string;
  name: string;
  pastor: string;
  city: string;
  phone: string;
  category: string;
  ID: number | string;
  product: string;
  inventory: number;
  price: string;
  churchName: string;
  parishLogoPath: string;
  parishPhoneNumber: string;
  state: string;
  address: string;
  email: string;
  country: string;
  nearestBusStop: String;
  pastorName: String;
  parishEmail: string;
}

export type complex =
  | IOveralTable;

export interface Itable {
  limit?: number;
  selectedCategory?: string;
  headData: string[];
  bodyData: (
    | IOveralTable
  )[];
}
