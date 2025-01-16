import { Sale, SaleResBody } from "./sale.types" 

type Client = {
  _id: string;
  userId: string;
  clientName: string;
  clientNameDetails: string;
  contactPhone: string;
  sales: Sale[];
  currentDebt: number;
  clientSalesValue: number;
}

type ClientResBody = Omit<Client, '_id' | 'userId' | 'sales'> & { sales: SaleResBody[] };

type ClientListItem = Omit<Client, 'userId' | 'sales'>;

type ClientEditableFields = Pick<Client, 'clientName' | 'clientNameDetails' | 'contactPhone'>;

export {
  Client,
  ClientResBody,
  ClientEditableFields,
  ClientListItem,
}
