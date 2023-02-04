import { Types } from "mongoose";
import { SaleDataForPaymentForm } from "./sale.types";

type Payment = {
  _id: Types.ObjectId;
  paymentDate: string;
  amount: number;
}

type PaymentPostReqBody = Omit<Payment, '_id' | 'paymentDate'> & { 
  _id?: Types.ObjectId;
  paymentDate: Date;
};
type PaymentPatchReqBody = Omit<Payment, '_id' | 'paymentDate'> & {
  _id: string | Types.ObjectId; 
  paymentDate: Date;
};
type PaymentResBody = Omit<Payment, '_id'> & { _id: string };
type PaymentEditionData = PaymentPatchReqBody & SaleDataForPaymentForm;

export {
  Payment,
  PaymentPostReqBody,
  PaymentPatchReqBody,
  PaymentResBody,
  PaymentEditionData
}
