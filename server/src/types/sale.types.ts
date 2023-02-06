import { Types } from "mongoose";
import { Client, ClientResBody } from "./client.types";
import { Payment, PaymentPostReqBody, PaymentResBody } from "./payment.types";

type Item = {
  name: string;
  quantity: number;
  pricePerUnit: number;
}

type ItemResBody = Omit<Item, '_id'> & { _id: string };

type Sale = {
  _id: Types.ObjectId;
  saleDate: string;
  items: Item[];
  payments: Payment[];
  saleValue: number;
  paidAmount: number;
  unpaidAmount: number;
};

type SalePostReqBody = Pick<Sale, 'items'> & {
  payments: PaymentPostReqBody[];
  saleDate: Date;
}

type SalePatchReqBody = Pick<Sale, 'items'> & {
  saleDate: Date;
};

type SaleResBody = Omit<Sale, '_id' | 'items' | 'payments'> & { 
  _id: string;
  items: ItemResBody[],
  payments: PaymentResBody[],
}

type SaleFormData = SalePatchReqBody & Pick<Client, 'clientName' | 'clientNameDetails'>; // this should be called SaleFormPageData or smth like that
type ClientAndSaleResBody = Omit<ClientResBody, 'sales'> & { sale: SaleResBody }; // this should be plainly called ClientAndSaleData
type SaleDataForPaymentForm = Pick<Client, 'clientName' | 'clientNameDetails'> & Pick<Sale, 'unpaidAmount' | 'saleDate'>;
type SaleAfterPayment = Pick<Sale, 'paidAmount' | 'unpaidAmount'>;

function isSalePostReqBody (saleReqBody: SalePostReqBody | SalePatchReqBody | SalePatchReqBody): saleReqBody is SalePostReqBody {
  return (saleReqBody as SalePostReqBody).payments !== undefined;   
};

function isSaleFormResBody (saleResBody: SaleFormData | ClientAndSaleResBody): saleResBody is SaleFormData {
  return (saleResBody as SaleFormData).items !== undefined;
};

function isClientAndSaleResBody (saleResBody: SaleFormData | ClientAndSaleResBody): saleResBody is ClientAndSaleResBody {
  return (saleResBody as ClientAndSaleResBody).contactPhone !== undefined;
};

export {
  Item,
  ItemResBody,
  Payment,
  Sale,
  SaleResBody,
  ClientAndSaleResBody,
  SalePostReqBody,
  SalePatchReqBody,
  SaleFormData,
  SaleAfterPayment,
  isSalePostReqBody,
  isSaleFormResBody,
  isClientAndSaleResBody,
  SaleDataForPaymentForm,
}
