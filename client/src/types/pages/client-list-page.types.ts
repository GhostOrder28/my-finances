import { ClientListItem } from '../../types/entities/client.types';

type State = {
  receivables: number;
  debtors: number;
  clientList: ClientListItem[];
  tbodyHeight: number;
  isLoading: boolean;
}

type Methods = {
  getClients: () => Promise<void>;
}

type Refs = {
  tableRef: HTMLTableElement;
  tbodyRef: HTMLTableSectionElement;
}

export {
  State,
  Methods,
  Refs
}
