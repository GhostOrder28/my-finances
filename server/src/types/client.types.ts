import mongoose, { Types } from 'mongoose';
import { Sale } from "./sale.types" 

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

type ClientListItem = Omit<Client, 'userId' | 'sales'>;

type ClientEditableFields = Pick<Client, 'clientName' | 'clientNameDetails' | 'contactPhone'>;

type ClientDocumentResponse = (mongoose.Document<unknown, any, Client> & Client & {
    _id: mongoose.Types.ObjectId;
}) | null

export {
  Client,
  ClientEditableFields,
  ClientDocumentResponse,
  ClientListItem,
}
