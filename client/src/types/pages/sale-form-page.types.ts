import { 
  SalePostReqBody, 
  SalePatchReqBody, 
  Item,
} from "../../types/entities/sale.types";
import SaleFormPage from '@/pages/sale-form-page.vue'

import { FormErrors } from "../global.types";

type Refs = {
  itemsRef: HTMLElement;
  actionsRef: typeof SaleFormPage;
}


type State = {
  itemsContainerHeight: number;
  clientName?: string;
  clientNameDetails?: string;
  initialPayment: number;
  formState: SalePostReqBody | SalePatchReqBody | Omit<SalePatchReqBody, 'clientName'>;
  formErrors: FormErrors | undefined;
  dateFormat: {
    stringify: (date: Date) => string;
  }
}

type Methods = {
  handleSubmit: () => Promise<void>;
  handleRemove: (idxToRemove: number) => Promise<void>;
  handlePress: (e: Event, idx: number) => void;
  getExistentItems: () => Item[];
  getSaleData: () => Promise<void>;
}

export {
  State,
  Methods,
  Refs,
}
