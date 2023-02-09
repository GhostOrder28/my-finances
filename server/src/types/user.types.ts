import { Types } from "mongoose";

type User = {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  totalSalesValue: number;
  receivables: number;
  debtors: number;
  creationDate: Date;
  guest?: boolean;
}

type UserAssets = Pick<User, 'debtors' | 'receivables' | 'totalSalesValue'>

export {
  User,
  UserAssets,
}
