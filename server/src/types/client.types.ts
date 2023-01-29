import mongoose, { Types } from 'mongoose';
import { Sale, SaleResBody } from "./sale.types" 

type Client = {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  clientName: string;
  clientNameDetails: string;
  contactPhone: string;
  sales: Sale[];
  currentDebt: number;
  clientSalesValue: number;
}

type ClientReqBody = Omit<Client, '_id'> & { _id?: string };
type ClientResBody = Omit<Client, '_id' | 'userId' | 'sales'> & { sales: SaleResBody[] };

type ClientListItem = Omit<Client, 'userId' | 'sales'>;

type ClientEditableFields = Pick<Client, 'clientName' | 'clientNameDetails' | 'contactPhone'>;

type ClientDocumentResponse = (mongoose.Document<unknown, any, Client> & Client & {
    _id: mongoose.Types.ObjectId;
}) | null

export {
  Client,
  ClientReqBody,
  ClientResBody,
  ClientEditableFields,
  ClientDocumentResponse,
  ClientListItem,
}
