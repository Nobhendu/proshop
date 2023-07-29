export type productType = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
};

export type itemType = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  cartItems: itemType[];
  qty: number;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

export type userType = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};
