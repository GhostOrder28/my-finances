import { Payment } from '../../types/entities/payment.types';
import { ClientAndSaleResBody } from '../../types/entities/sale.types';

type State = {
  displayPaymentDeletionConfirmation: boolean;
  displaySaleDeletionConfirmation: boolean;
  paymentToDelete: string | undefined;
  pressTimeoutId: number | undefined;
  clientData: ClientAndSaleResBody | undefined;
  currentView: string;
  tbodyHeight: number;
  actionPanel: number | undefined;
  isLoading: boolean;
}

type Methods = {
  changeView: (e: MouseEvent) => void;
  getSaleData: () => Promise<void>;
  onLongPressStop: (e: PointerEvent, idx: number) => void;
  getPaymentStyle: (idx: number) => string;
  toggleActionPanel: (idx: number) => 'action-panel-active' | 'action-panel';
  toggleSelectedRow: (idx: number) => 'row-selected' | '';
  declarePaymentDeletionIntent: (paymentId: string) => void;
  declareSaleDeletionIntent: () => void;
  deletePayment: (paymentId: string | undefined) => Promise<void>;
  deleteSale: (saleId: string) => Promise<void>;
  startLongPress: (rowIdx: number) => void;
}

type Refs = { 
  tableRef: HTMLTableElement;
}

export {
  Payment,
  State,
  Methods,
  Refs,
}
