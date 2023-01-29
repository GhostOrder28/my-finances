import { Payment } from '#backend/payment.types';
import { ClientAndSaleResBody } from '#backend/sale.types';

type State = {
  clientData: ClientAndSaleResBody | undefined,
  currentView: 'products' | 'payments',
  tbodyHeight: number;
}

type Methods = {
  changeView: (e: MouseEvent) => void;
  getSaleData: () => Promise<void>;

}

export {
  Payment,
  State,
  Methods,
}
