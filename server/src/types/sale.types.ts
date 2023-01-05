import { Types } from "mongoose";
import { Payment } from "./payment.types";

type Item = {
  _id: Types.ObjectId;
  name: string;
  quantity: number;
  price: number;
}

type Sale = {
  _id: Types.ObjectId;
  date: Date;
  items: Item[];
  payments: Payment[];
  saleValue: number;
  paidAmount: number;
  unpaidAmount: number;
}

type SaleRequestBody = Pick<Sale, 'date' | 'items' | 'payments'>

export {
  Item,
  Payment,
  Sale,
  SaleRequestBody,
}
