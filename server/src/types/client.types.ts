import mongoose, { Types } from 'mongoose';
import { Sale } from "./sale.types" 

type Client = {
  userId: Types.ObjectId;
  clientName: string;
  nameDetails: string;
  contactPhone: string;
  sales: Sale[];
  currentDebt: number;
  totalSalesValue: number;
}

type ClientEditableFields = Pick<Client, 'clientName' | 'nameDetails' | 'contactPhone'>;

type ClientDocumentResponse = (mongoose.Document<unknown, any, Client> & Client & {
    _id: mongoose.Types.ObjectId;
}) | null

export {
  Client,
  ClientEditableFields,
  ClientDocumentResponse,
}
