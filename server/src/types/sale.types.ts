type SaleItem = {
  name: string;
  quantity: number;
  price: number;
}

type PaymentItem = {
  date: Date;
  amount: number;
  details: string;
}

type SaleRequestBody = {
  clientName: string;
  date: Date;
  initialPayment?: Number;
  items: SaleItem[];
  payments: PaymentItem[];
  totalValue: number;
  paidAmount: number;
  debt: number;
}

type Sale = SaleRequestBody & {
  userId: string;
  clientId: string;
}

export {
  SaleRequestBody,
  SaleItem,
  Sale,
}
