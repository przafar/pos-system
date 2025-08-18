export type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  unit: string;
  discount?: number;
};