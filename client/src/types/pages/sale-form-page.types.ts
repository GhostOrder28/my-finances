import { 
  SalePostReqBody, 
  SalePatchReqBody, 
  Item,
} from "#backend/sale.types";

type Refs = {
  itemsRef: HTMLElement;
  actionsRef: HTMLElement;
}

type FormErrors = { [key: string]: string }

type State = {
  itemsContainerHeight: number;
  clientName?: string;
  clientNameDetails?: string;
  initialPayment: number;
  formState: SalePostReqBody | SalePatchReqBody | Omit<SalePatchReqBody, 'clientName'>;
  formErrors: FormErrors | undefined;
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
