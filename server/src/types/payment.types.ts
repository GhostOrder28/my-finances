import { Types } from "mongoose";

type Payment = {
  _id: Types.ObjectId;
  date: Date;
  amount: number;
}

export {
  Payment
}
