import { Sale } from "./sale.types" 

type Client = {
  name: string;
  nameDetails: string;
  contactPhone: string;
  sales: Sale[];
  totalDebtValue: number;
  totalSalesValue: number;
}

export {
  Client,
}
