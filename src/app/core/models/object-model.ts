export class User {
  aboutYou: string;
  age: number;
  agreetc: boolean;
  dob: string;
  email: string;
  gender: string;
  address: Address;
  language: string;
  mobNumber: string;
  name: string;
  password: string;
  // uploadPhoto: Image;
  uploadPhoto: string;
  role: string;
  isshopowner: string;
}

export class Address {
  id: number;
  addLine1: string;
  addLine2: string;
  city: string;
  state: string;
  zipCode: number;
}

export class Product {
  id: number;
  name: string;
  uploadPhoto: string;
  productDesc: string;
  mrp: number;
  dp: number;
  status: boolean;
  addedBy: string;
  isshopowner: boolean;
  user_session_id: number;
}

export class Order {
  orderid: number;
  userId: number;
  // sellerId: number;
  product: Product;
  deliveryAddress: Address;
  contact: Number;
  dateTime: string;
  status: string;
  is_negotiation: boolean;
  negotiation_price: number;
  static id: any;
}

export class Scheme {
  id: number;
  name: string;
  total_benifits: string;
  date: string;
  schemeFor: string;
  links: string;
}